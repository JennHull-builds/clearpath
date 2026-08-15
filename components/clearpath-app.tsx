"use client";

import { useState, type ReactNode } from "react";
import type { Capacity, PathRequest, PathResult } from "@/lib/schema";

type Step = "dump" | "capacity" | "path";

const CAPACITY: { value: Capacity; label: string; hint: string }[] = [
  { value: "low", label: "Low", hint: "A few spoons left" },
  { value: "medium", label: "Medium", hint: "A decent stretch" },
  { value: "high", label: "High", hint: "Some runway" },
];

export function ClearpathApp() {
  const [step, setStep] = useState<Step>("dump");
  const [dump, setDump] = useState("");
  const [result, setResult] = useState<PathResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function reset() {
    setStep("dump");
    setDump("");
    setResult(null);
    setError(null);
    setLoading(false);
  }

  async function findPath(nextCapacity: Capacity) {
    const payload: PathRequest = {
      dump: dump.trim(),
      capacity: nextCapacity,
    };

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/path", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data: unknown = await response.json();

      if (!response.ok) {
        const failed = data as { error?: string };
        throw new Error(failed.error || "The clearing got foggy.");
      }

      setResult(data as PathResult);
      setStep("path");
    } catch (err) {
      setError(err instanceof Error ? err.message : "The clearing got foggy.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-xl flex-col px-5 py-10 sm:py-16">
      <header className="mb-10">
        <p className="text-sm tracking-wide text-fern uppercase">Clearpath</p>
        <h1 className="font-display mt-2 text-4xl leading-tight text-moss sm:text-5xl">
          Park the noise.
          <br />
          See one path.
        </h1>
      </header>

      {step === "dump" && (
        <section className="grid gap-4">
          <p className="text-lg text-ink">{"What's buzzing?"}</p>
          <p className="text-bark -mt-2 text-sm">
            Tasks, noise, the fuzzy goal — all of it. No sorting.
          </p>
          <textarea
            value={dump}
            onChange={(event) => setDump(event.target.value)}
            rows={7}
            maxLength={4000}
            placeholder="The responsible thing, the fun thing, dishes, that email, the vague project…"
            className="rounded-2xl border border-moss/15 bg-white/70 px-4 py-3 text-ink placeholder:text-bark/50 outline-none focus:border-fern"
          />
          <Primary
            onClick={() => setStep("capacity")}
            disabled={!dump.trim()}
          >
            Parked. Next.
          </Primary>
        </section>
      )}

      {step === "capacity" && (
        <section className="grid gap-4">
          <p className="text-lg text-ink">How many spoons today?</p>
          {loading ? (
            <p className="text-bark text-sm">Clearing a path…</p>
          ) : (
            <div className="grid gap-3">
              {CAPACITY.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => {
                    void findPath(item.value);
                  }}
                  className="rounded-2xl border border-moss/15 bg-white/70 px-5 py-4 text-left transition hover:border-fern hover:bg-mist"
                >
                  <span className="font-display text-xl text-moss">
                    {item.label}
                  </span>
                  <span className="text-bark mt-1 block text-sm">
                    {item.hint}
                  </span>
                </button>
              ))}
            </div>
          )}
          {!loading && (
            <Ghost onClick={() => setStep("dump")}>Back</Ghost>
          )}
          {error && <ErrorNote message={error} />}
        </section>
      )}

      {step === "path" && result && (
        <section className="grid gap-6">
          {result.mode === "pick" ? (
            <PickCard path={result.path} />
          ) : (
            <BreakCard path={result.path} />
          )}
          <Ghost onClick={reset}>Another path</Ghost>
        </section>
      )}
    </main>
  );
}

function Primary({
  children,
  onClick,
  disabled,
}: {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="rounded-full bg-moss px-5 py-2.5 text-sm text-cream transition hover:bg-fern disabled:cursor-not-allowed disabled:opacity-50"
    >
      {children}
    </button>
  );
}

function Ghost({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full px-4 py-2.5 text-sm text-bark transition hover:text-moss"
    >
      {children}
    </button>
  );
}

function ErrorNote({ message }: { message: string }) {
  return <p className="text-sm text-clay">{message}</p>;
}

function PickCard({ path }: { path: Extract<PathResult, { mode: "pick" }>["path"] }) {
  return (
    <article className="rounded-3xl border border-moss/15 bg-white/80 p-6 shadow-sm">
      <p className="text-sm tracking-wide text-fern uppercase">Do this now</p>
      <h2 className="font-display mt-2 text-3xl text-moss">{path.now}</h2>
      <p className="mt-4 leading-relaxed text-ink">{path.why}</p>
      <div className="bg-mist mt-6 rounded-2xl p-4">
        <p className="text-sm text-bark">Start here</p>
        <p className="mt-1 text-lg text-ink">{path.startHere}</p>
      </div>
      <p className="mt-5 text-ink">
        Then: <span className="text-moss">{path.after}</span>
      </p>
      <p className="text-bark mt-2 text-sm">Later, guilt-free: {path.later}</p>
      <p className="font-display mt-6 text-lg text-fern">{path.note}</p>
    </article>
  );
}

function BreakCard({
  path,
}: {
  path: Extract<PathResult, { mode: "break" }>["path"];
}) {
  return (
    <article className="rounded-3xl border border-moss/15 bg-white/80 p-6 shadow-sm">
      <p className="text-sm tracking-wide text-fern uppercase">The goal</p>
      <h2 className="font-display mt-2 text-3xl text-moss">{path.restated}</h2>
      <ol className="mt-6 grid gap-3">
        {path.steps.map((step, index) => (
          <li
            key={`${step.title}-${index}`}
            className="flex items-start justify-between gap-4 rounded-2xl bg-mist px-4 py-3"
          >
            <span className="text-ink">
              <span className="text-fern mr-2 text-sm">{index + 1}.</span>
              {step.title}
            </span>
            <span className="text-bark shrink-0 text-sm">{step.estimate}</span>
          </li>
        ))}
      </ol>
      <div className="mt-6 rounded-2xl bg-moss px-4 py-4 text-cream">
        <p className="text-sm text-cream/70">Start here</p>
        <p className="mt-1 text-lg">{path.startHere}</p>
      </div>
      <p className="font-display mt-6 text-lg text-fern">{path.note}</p>
    </article>
  );
}
