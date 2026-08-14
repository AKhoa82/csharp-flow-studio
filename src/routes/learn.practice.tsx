import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { Brain, Target, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader, SectionCard } from "@/components/primitives";
import { courses, weakTopics } from "@/lib/mock-data";

export const Route = createFileRoute("/learn/practice")({
  head: () => ({
    meta: [
      { title: "Practice — CSharpHub" },
      {
        name: "description",
        content:
          "Drill C# and OOP questions: quick mixed sets, course-focused practice, or targeted work on your weakest topics.",
      },
      { property: "og:title", content: "Practice — CSharpHub" },
      {
        property: "og:description",
        content: "Quick drills, course practice, and weak-topic training for C# learners.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PracticeLayout,
});

function PracticeLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  if (pathname !== "/learn/practice") return <Outlet />;
  return <PracticeHub />;
}

function PracticeHub() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Learn"
        title="Practice"
        description="Short, focused question sets with instant feedback and explanations."
      />

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          {
            mode: "quick" as const,
            icon: Zap,
            title: "Quick drill",
            body: "10 mixed questions across every course you are enrolled in.",
          },
          {
            mode: "weak" as const,
            icon: Brain,
            title: "Weak topics",
            body: "Questions drawn from the topics where your accuracy is lowest.",
          },
          {
            mode: "course" as const,
            icon: Target,
            title: "By course",
            body: "Practice only what a single course covers, chapter by chapter.",
          },
        ].map((m) => (
          <div key={m.mode} className="surface flex flex-col p-5">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary-soft text-primary">
              <m.icon className="h-5 w-5" />
            </span>
            <p className="mt-3 text-sm font-semibold">{m.title}</p>
            <p className="mt-1 flex-1 text-sm leading-6 text-muted-foreground">{m.body}</p>
            {m.mode === "course" ? null : (
              <Button asChild className="mt-4">
                <Link to="/learn/practice/session" search={{ mode: m.mode }}>
                  Start
                </Link>
              </Button>
            )}
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard title="Practice by course" bodyClassName="space-y-2">
          {courses.slice(0, 5).map((c) => (
            <div
              key={c.id}
              className="flex items-center gap-3 rounded-lg border border-border px-3 py-2.5"
            >
              <span className="min-w-0 flex-1 truncate text-sm font-medium">{c.title}</span>
              <Button asChild size="sm" variant="outline">
                <Link to="/learn/practice/session" search={{ mode: "course", course: c.id }}>
                  Practice
                </Link>
              </Button>
            </div>
          ))}
        </SectionCard>

        <SectionCard title="Your weakest topics" description="Accuracy over the last 30 days">
          <div className="space-y-3">
            {weakTopics.map((t) => (
              <div key={t.topic} className="flex items-center gap-3">
                <span className="min-w-0 flex-1 truncate text-sm">{t.topic}</span>
                <span className="text-sm font-semibold tabular-nums text-warning-foreground">
                  {t.accuracy}%
                </span>
              </div>
            ))}
          </div>
          <Button asChild variant="outline" className="mt-4 w-full">
            <Link to="/learn/practice/session" search={{ mode: "weak" }}>
              Drill weak topics
            </Link>
          </Button>
        </SectionCard>
      </div>
    </div>
  );
}
