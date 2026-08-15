import { useEffect, useRef } from "react";
import type { PathResult } from "@/lib/schema";

export function PathSheet({
  result,
  folding,
  onAgain,
}: {
  result: PathResult;
  folding: boolean;
  onAgain: () => void;
}) {
  const heroRef = useRef<HTMLHeadingElement>(null);
  const hero = result.mode === "pick" ? result.path.now : result.path.restated;

  useEffect(() => {
    heroRef.current?.focus({ preventScroll: true });
  }, []);

  return (
    <article className={`path-sheet${folding ? " is-folding" : ""}`}>
      <h2 ref={heroRef} className="task-hero" tabIndex={-1}>
        {hero}
      </h2>

      {result.mode === "pick" ? (
        <>
          <p className="task-support" data-i="0">
            {result.path.why}
          </p>
          <StartHere action={result.path.startHere} />
          <p className="task-support" data-i="1">
            <span className="task-kicker">Then </span>
            {result.path.after}
          </p>
          <p className="task-support" data-i="2">
            <span className="task-kicker">Later, guilt-free: </span>
            {result.path.later}
          </p>
          <p className="note-line">{result.path.note}</p>
        </>
      ) : (
        <>
          <ol className="step-list">
            {result.path.steps.map((step, index) => (
              <li key={`${step.title}-${index}`}>
                <span>
                  <span className="step-n">{index + 1}</span>
                  {step.title}
                </span>
                <span className="step-est">{step.estimate}</span>
              </li>
            ))}
          </ol>
          <StartHere action={result.path.startHere} />
          <p className="note-line">{result.path.note}</p>
        </>
      )}

      <button type="button" className="again" onClick={onAgain}>
        Another path
      </button>
    </article>
  );
}

function StartHere({ action }: { action: string }) {
  return (
    <div className="start-here">
      <p className="start-kicker">Start here</p>
      <p className="start-action">{action}</p>
    </div>
  );
}
