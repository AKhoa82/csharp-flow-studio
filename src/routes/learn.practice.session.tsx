import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft, CheckCircle2, RotateCcw, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { DifficultyBadge, SectionCard } from "@/components/primitives";
import { getCourse, questions } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

type Mode = "quick" | "course" | "weak";

export const Route = createFileRoute("/learn/practice/session")({
  validateSearch: (search: Record<string, unknown>): { mode: Mode; course?: string } => {
    const raw = search["mode"];
    const mode: Mode = raw === "course" || raw === "weak" ? raw : "quick";
    const course = search["course"];
    return typeof course === "string" ? { mode, course } : { mode };
  },
  head: () => ({
    meta: [
      { title: "Practice session — CSharpHub" },
      {
        name: "description",
        content: "Answer C# practice questions one at a time with instant feedback.",
      },
      { property: "og:title", content: "Practice session — CSharpHub" },
      {
        property: "og:description",
        content: "Answer C# practice questions one at a time with instant feedback.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PracticeSession,
});

function PracticeSession() {
  const { mode, course } = Route.useSearch();
  const pool = useMemo(() => {
    const base = course ? questions.filter((q) => q.courseId === course) : questions;
    return (base.length > 0 ? base : questions).slice(0, 8);
  }, [course]);

  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = pool[idx]!;
  const label =
    mode === "course" && course ? getCourse(course).title : mode === "weak" ? "Weak topics" : "Quick drill";

  function submit() {
    if (!picked) return;
    setRevealed(true);
    if (q.options.find((o) => o.id === picked)?.correct) setScore((s) => s + 1);
  }

  function next() {
    if (idx === pool.length - 1) {
      setFinished(true);
      return;
    }
    setIdx((i) => i + 1);
    setPicked(null);
    setRevealed(false);
  }

  function restart() {
    setIdx(0);
    setPicked(null);
    setRevealed(false);
    setScore(0);
    setFinished(false);
  }

  if (finished) {
    const pct = Math.round((score / pool.length) * 100);
    return (
      <div className="mx-auto max-w-xl space-y-6">
        <SectionCard title="Session complete" description={label}>
          <p className="text-4xl font-bold tabular-nums">{pct}%</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {score} of {pool.length} correct
          </p>
          <Progress value={pct} className="mt-4 h-2" />
          <div className="mt-5 flex flex-wrap gap-2">
            <Button onClick={restart}>
              <RotateCcw className="h-4 w-4" /> Practice again
            </Button>
            <Button asChild variant="outline">
              <Link to="/learn/practice">Back to practice</Link>
            </Button>
          </div>
        </SectionCard>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <div className="flex items-center justify-between gap-3">
        <Link
          to="/learn/practice"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> {label}
        </Link>
        <span className="text-xs text-muted-foreground">
          Question {idx + 1} of {pool.length}
        </span>
      </div>

      <Progress value={((idx + (revealed ? 1 : 0)) / pool.length) * 100} className="h-1.5" />

      <article className="surface p-6">
        <div className="flex flex-wrap items-center gap-2">
          <DifficultyBadge difficulty={q.difficulty} />
          <span className="text-xs text-muted-foreground">
            {q.chapter} · {q.lesson}
          </span>
        </div>
        <h1 className="mt-3 text-lg font-semibold leading-snug">{q.content}</h1>

        <div className="mt-5 space-y-2">
          {q.options.map((o) => {
            const selected = picked === o.id;
            const state = revealed
              ? o.correct
                ? "correct"
                : selected
                  ? "wrong"
                  : "idle"
              : selected
                ? "selected"
                : "idle";
            return (
              <button
                key={o.id}
                disabled={revealed}
                onClick={() => setPicked(o.id)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-colors",
                  state === "idle" && "border-border hover:bg-muted/60",
                  state === "selected" && "border-primary bg-primary-soft/60",
                  state === "correct" && "border-success/40 bg-success-soft",
                  state === "wrong" && "border-destructive/40 bg-destructive/10",
                )}
              >
                <span className="min-w-0 flex-1">{o.text}</span>
                {state === "correct" ? <CheckCircle2 className="h-4 w-4 text-success" /> : null}
                {state === "wrong" ? <XCircle className="h-4 w-4 text-destructive" /> : null}
              </button>
            );
          })}
        </div>

        {revealed ? (
          <div className="mt-5 rounded-xl border border-info/25 bg-info-soft/50 p-4 text-sm leading-6">
            {q.explanation}
          </div>
        ) : null}

        <div className="mt-6 flex justify-end">
          {revealed ? (
            <Button onClick={next}>{idx === pool.length - 1 ? "See results" : "Next question"}</Button>
          ) : (
            <Button onClick={submit} disabled={!picked}>
              Check answer
            </Button>
          )}
        </div>
      </article>
    </div>
  );
}
