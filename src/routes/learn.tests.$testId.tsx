import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, CheckCircle2, Clock, Flag, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { DifficultyBadge, SectionCard } from "@/components/primitives";
import { questions, tests } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const getTest = (id: string) => tests.find((t) => t.id === id) ?? tests[0]!;

export const Route = createFileRoute("/learn/tests/$testId")({
  head: ({ params }) => {
    const t = getTest(params.testId);
    const description = `Timed assessment: ${t.title} — ${t.questions} questions in ${t.duration} minutes.`;
    return {
      meta: [
        { title: `${t.title} — CSharpHub` },
        { name: "description", content: description },
        { property: "og:title", content: `${t.title} — CSharpHub` },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: TestRunner,
});

function TestRunner() {
  const { testId } = Route.useParams();
  const test = getTest(testId);
  const pool = useMemo(() => questions.slice(0, Math.min(6, questions.length)), []);

  const [started, setStarted] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [idx, setIdx] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [left, setLeft] = useState(test.duration * 60);

  useEffect(() => {
    if (!started || submitted) return;
    const t = setInterval(() => {
      setLeft((s) => {
        if (s <= 1) {
          setSubmitted(true);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [started, submitted]);

  const correct = pool.filter(
    (q) => q.options.find((o) => o.id === answers[q.id])?.correct,
  ).length;
  const mm = String(Math.floor(left / 60)).padStart(2, "0");
  const ss = String(left % 60).padStart(2, "0");

  if (!started) {
    return (
      <div className="mx-auto max-w-xl space-y-5">
        <Link
          to="/learn/courses"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Courses
        </Link>
        <SectionCard title={test.title} description={test.course}>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>{pool.length} questions in this attempt</li>
            <li>{test.duration} minutes, timed — the test submits automatically at zero</li>
            <li>You can move freely between questions before submitting</li>
          </ul>
          <div className="mt-3">
            <DifficultyBadge difficulty={test.difficulty} />
          </div>
          <Button className="mt-5 w-full" onClick={() => setStarted(true)}>
            Start test
          </Button>
        </SectionCard>
      </div>
    );
  }

  if (submitted) {
    const pct = Math.round((correct / pool.length) * 100);
    return (
      <div className="mx-auto max-w-2xl space-y-5">
        <SectionCard title="Results" description={test.title}>
          <p className="text-4xl font-bold tabular-nums">{pct}%</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {correct} of {pool.length} correct
          </p>
          <Progress value={pct} className="mt-4 h-2" />
        </SectionCard>

        <SectionCard title="Review" bodyClassName="space-y-4">
          {pool.map((q, i) => {
            const picked = answers[q.id];
            const ok = q.options.find((o) => o.id === picked)?.correct ?? false;
            return (
              <div key={q.id} className="rounded-xl border border-border p-4">
                <div className="flex items-start gap-2">
                  {ok ? (
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                  ) : (
                    <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                  )}
                  <p className="text-sm font-medium leading-snug">
                    {i + 1}. {q.content}
                  </p>
                </div>
                <p className="mt-2 pl-6 text-sm text-muted-foreground">
                  Correct answer: {q.options.find((o) => o.correct)?.text}
                </p>
                <p className="mt-1 pl-6 text-sm leading-6 text-muted-foreground">{q.explanation}</p>
              </div>
            );
          })}
          <Button asChild variant="outline" className="w-full">
            <Link to="/learn">Back to dashboard</Link>
          </Button>
        </SectionCard>
      </div>
    );
  }

  const q = pool[idx]!;
  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <div className="flex items-center justify-between gap-3">
        <span className="truncate text-sm font-semibold">{test.title}</span>
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-sm font-semibold tabular-nums",
            left < 60 ? "bg-destructive/10 text-destructive" : "bg-secondary text-secondary-foreground",
          )}
        >
          <Clock className="h-3.5 w-3.5" /> {mm}:{ss}
        </span>
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_200px]">
        <article className="surface p-6">
          <span className="text-xs text-muted-foreground">
            Question {idx + 1} of {pool.length}
          </span>
          <h1 className="mt-2 text-lg font-semibold leading-snug">{q.content}</h1>
          <div className="mt-5 space-y-2">
            {q.options.map((o) => (
              <button
                key={o.id}
                onClick={() => setAnswers((a) => ({ ...a, [q.id]: o.id }))}
                className={cn(
                  "flex w-full items-center rounded-xl border px-4 py-3 text-left text-sm transition-colors",
                  answers[q.id] === o.id
                    ? "border-primary bg-primary-soft/60"
                    : "border-border hover:bg-muted/60",
                )}
              >
                {o.text}
              </button>
            ))}
          </div>
          <div className="mt-6 flex items-center justify-between gap-3">
            <Button variant="outline" disabled={idx === 0} onClick={() => setIdx((i) => i - 1)}>
              Previous
            </Button>
            {idx === pool.length - 1 ? (
              <Button onClick={() => setSubmitted(true)}>
                <Flag className="h-4 w-4" /> Submit test
              </Button>
            ) : (
              <Button onClick={() => setIdx((i) => i + 1)}>Next</Button>
            )}
          </div>
        </article>

        <aside className="space-y-4">
          <SectionCard title="Navigator" bodyClassName="p-3">
            <div className="grid grid-cols-5 gap-2">
              {pool.map((item, i) => (
                <button
                  key={item.id}
                  onClick={() => setIdx(i)}
                  className={cn(
                    "grid h-9 place-items-center rounded-lg text-xs font-semibold transition-colors",
                    i === idx
                      ? "bg-primary text-primary-foreground"
                      : answers[item.id]
                        ? "bg-primary-soft text-primary"
                        : "bg-secondary text-muted-foreground hover:bg-muted",
                  )}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              {Object.keys(answers).length} of {pool.length} answered
            </p>
          </SectionCard>
        </aside>
      </div>
    </div>
  );
}
