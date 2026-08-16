"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { flushSync } from "react-dom";
import { PathSheet } from "@/components/path-sheet";
import { ENERGY_UNIT } from "@/lib/energy";
import type { Capacity, PathRequest, PathResult } from "@/lib/schema";

type Phase = "dump" | "juice" | "path";

const WARM_ERROR = "Couldn't find a path just then. Try again?";

const JUICE_BANDS: { value: Capacity; label: string; hint: string }[] = [
  { value: "low", label: "Low", hint: "Not much" },
  { value: "medium", label: "Medium", hint: "A decent amount" },
  { value: "high", label: "High", hint: "Plenty" },
];

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function withViewTransition(update: () => void) {
  if (prefersReducedMotion() || !("startViewTransition" in document)) {
    update();
    return;
  }

  document.startViewTransition(() => {
    flushSync(update);
  });
}

export function ClearpathApp() {
  const [phase, setPhase] = useState<Phase>("dump");
  const [dump, setDump] = useState("");
  const [selected, setSelected] = useState<Capacity | null>(null);
  const [result, setResult] = useState<PathResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [foldingAway, setFoldingAway] = useState(false);
  const foldTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const ready = dump.trim().length > 0;

  useEffect(() => {
    return () => {
      abortRef.current?.abort();
      if (foldTimer.current !== null) {
        clearTimeout(foldTimer.current);
      }
    };
  }, []);

  function clearFoldTimer() {
    if (foldTimer.current !== null) {
      clearTimeout(foldTimer.current);
      foldTimer.current = null;
    }
  }

  function resetState() {
    abortRef.current?.abort();
    abortRef.current = null;
    clearFoldTimer();
    setPhase("dump");
    setDump("");
    setSelected(null);
    setResult(null);
    setError(null);
    setLoading(false);
    setFoldingAway(false);
  }

  function goToJuice() {
    if (!ready) return;
    withViewTransition(() => {
      setError(null);
      setPhase("juice");
    });
  }

  function goBackToDump() {
    abortRef.current?.abort();
    abortRef.current = null;
    withViewTransition(() => {
      setPhase("dump");
      setSelected(null);
      setError(null);
      setLoading(false);
    });
  }

  function anotherPath() {
    if (prefersReducedMotion()) {
      withViewTransition(resetState);
      return;
    }

    setFoldingAway(true);
    clearFoldTimer();
    foldTimer.current = setTimeout(() => {
      withViewTransition(resetState);
    }, 400);
  }

  async function findPath(nextCapacity: Capacity) {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    const payload: PathRequest = {
      dump: dump.trim(),
      capacity: nextCapacity,
    };

    setSelected(nextCapacity);
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/path", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      const data: unknown = await response.json();

      if (!response.ok) {
        throw new Error(WARM_ERROR);
      }

      setResult(data as PathResult);
      setPhase("path");
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") {
        return;
      }
      setError(WARM_ERROR);
      if (phase !== "path") {
        setSelected(null);
      }
    } finally {
      if (abortRef.current === controller) {
        setLoading(false);
        abortRef.current = null;
      }
    }
  }

  const stackPhase = phase === "path" ? "path" : loading ? "loading" : "juice";

  return (
    <div className="app-shell">
      <main className="app-frame">
        {phase === "dump" ? (
          <DumpScene
            dump={dump}
            ready={ready}
            onDumpChange={setDump}
            onContinue={goToJuice}
          />
        ) : (
          <JuicePathScene
            stackPhase={stackPhase}
            selected={selected}
            loading={loading}
            error={error}
            result={result}
            foldingAway={foldingAway}
            onBack={goBackToDump}
            onPick={(value) => {
              if (loading || value === selected) return;
              void findPath(value);
            }}
            onAgain={anotherPath}
          />
        )}
      </main>
    </div>
  );
}

function DumpScene({
  dump,
  ready,
  onDumpChange,
  onContinue,
}: {
  dump: string;
  ready: boolean;
  onDumpChange: (value: string) => void;
  onContinue: () => void;
}) {
  const fieldRef = useRef<HTMLTextAreaElement>(null);

  function submitDump(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!ready) {
      fieldRef.current?.focus();
      return;
    }
    onContinue();
  }

  return (
    <section className="dump-scene">
      <p className="wordmark">Clearpath</p>
      <h1 className="dump-prompt">What&apos;s buzzing?</h1>
      <p className="dump-quiet">
        Tasks, noise, the fuzzy goal — all of it. No sorting.
      </p>
      <form className="dump-form" onSubmit={submitDump}>
        <textarea
          ref={fieldRef}
          className="dump-field"
          value={dump}
          onChange={(event) => onDumpChange(event.target.value)}
          maxLength={4000}
          placeholder="The responsible thing, the fun thing, dishes, that email, the vague project…"
          aria-label="What's buzzing?"
        />
        <button type="submit" className="continue">
          Continue
        </button>
      </form>
    </section>
  );
}

function JuicePathScene({
  stackPhase,
  selected,
  loading,
  error,
  result,
  foldingAway,
  onBack,
  onPick,
  onAgain,
}: {
  stackPhase: "juice" | "loading" | "path";
  selected: Capacity | null;
  loading: boolean;
  error: string | null;
  result: PathResult | null;
  foldingAway: boolean;
  onBack: () => void;
  onPick: (value: Capacity) => void;
  onAgain: () => void;
}) {
  return (
    <section className="juice-path-scene" data-selected={selected ?? ""}>
      <header className="juice-chrome">
        <h1 className="juice-prompt" tabIndex={-1}>
          How much {ENERGY_UNIT}?
        </h1>
        {loading ? null : (
          <button type="button" className="back-ink" onClick={onBack}>
            Back
          </button>
        )}
      </header>

      <div
        className="juice-stack"
        data-phase={stackPhase}
        data-selected={selected ?? ""}
        aria-busy={loading}
      >
        {JUICE_BANDS.map((item) => {
          const isSelected = selected === item.value;

          return (
            <button
              key={item.value}
              type="button"
              className={[
                "band",
                isSelected ? "is-selected" : "",
                loading && isSelected ? "is-loading" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              data-level={item.value}
              onClick={() => onPick(item.value)}
              disabled={loading}
              aria-pressed={isSelected}
              aria-label={`${item.label}. ${item.hint}`}
            >
              <span className="band-label">{item.label}</span>
              <span className="band-hint">{item.hint}</span>
            </button>
          );
        })}

        <div className="fold-parent">
          {result && stackPhase === "path" ? (
            <PathSheet
              result={result}
              folding={foldingAway}
              onAgain={onAgain}
            />
          ) : null}
        </div>
      </div>

      {error ? (
        <p className="error-note" role="alert">
          {error}
        </p>
      ) : null}
    </section>
  );
}
