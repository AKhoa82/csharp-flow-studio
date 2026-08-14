import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  Clock,
  Flame,
  Play,
  Sparkles,
  Target,
  Trophy,
} from "lucide-react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { LevelBadge, SectionCard, StatCard } from "@/components/primitives";
import { OnboardingTour, restartOnboardingTour } from "@/components/onboarding-tour";
import { chaptersOf, courses, tests, weakTopics, type Course, type Lesson } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/learn/")({
  head: () => ({
    meta: [
      { title: "My learning — CSharpHub" },
      {
        name: "description",
        content: "Track your C# progress, resume lessons, drill weak topics and take timed tests.",
      },
      { property: "og:title", content: "My learning — CSharpHub" },
      {
        property: "og:description",
        content: "Track your C# progress, resume lessons, drill weak topics and take timed tests.",
      },
    ],
  }),
  component: StudentDashboard,
});

const weeklyActivity = [
  { day: "Mon", minutes: 35 },
  { day: "Tue", minutes: 20 },
  { day: "Wed", minutes: 45 },
  { day: "Thu", minutes: 15 },
  { day: "Fri", minutes: 50 },
  { day: "Sat", minutes: 65 },
  { day: "Sun", minutes: 30 },
];

function nextLessonFor(courseId: string, progress: number): Lesson | undefined {
  const flat = chaptersOf(courseId).flatMap((ch) => ch.lessons);
  if (flat.length === 0) return undefined;
  return flat[Math.min(Math.floor((progress / 100) * flat.length), flat.length - 1)];
}

function StudentDashboard() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  const inProgress = courses.filter((c) => c.progress > 0 && c.progress < 100);
  const featured: Course | undefined = inProgress[0];
  const featuredLesson = featured ? nextLessonFor(featured.id, featured.progress) : undefined;
  const myCourses = courses.filter((c) => c.progress > 0).slice(0, 5);
  const upcoming = tests.filter((t) => t.status === "published").slice(0, 3);
  const recommended = courses.filter((c) => c.progress < 100).slice(0, 3);

  return (
    <div className="space-y-6">
      <OnboardingTour />
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-sm text-muted-foreground">{today}</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-[1.75rem]">
            Welcome back, Tan
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground"
            onClick={restartOnboardingTour}
          >
            <Compass className="h-3.5 w-3.5" /> Replay tour
          </Button>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-warning/25 bg-warning-soft px-3 py-1.5 text-xs font-semibold text-warning-foreground">
            <Flame className="h-3.5 w-3.5" /> 12-day streak — keep it alive today
          </span>
        </div>
      </div>


      <div data-tour="progress" className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Day streak" value="12" delta="Best so far: 21 days" icon={Flame} tone="warning" />
        <StatCard label="Lessons completed" value="47" delta="+6 this week" icon={CheckCircle2} tone="success" />
        <StatCard label="Practice accuracy" value="82%" delta="+4 pts this month" icon={Target} tone="primary" />
        <StatCard label="Tests passed" value="6" delta="Latest score: 88%" icon={Trophy} tone="brand" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {featured ? (
            <section data-tour="continue" className="surface overflow-hidden">
              <div className="grid md:grid-cols-[minmax(0,1fr)_220px]">
                <div className="p-6 sm:p-7">
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                    Continue learning
                  </p>
                  <h2 className="mt-2 text-xl font-bold">{featured.title}</h2>
                  {featuredLesson ? (
                    <p className="mt-1 text-sm text-muted-foreground">
                      Next up:{" "}
                      <span className="font-medium text-foreground">{featuredLesson.title}</span> ·{" "}
                      {featuredLesson.minutes} min
                    </p>
                  ) : null}
                  <div className="mt-4 flex items-center gap-3">
                    <Progress value={featured.progress} className="h-2 flex-1" />
                    <span className="text-sm font-semibold tabular-nums">{featured.progress}%</span>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {featuredLesson ? (
                      <Button asChild>
                        <Link
                          to="/learn/courses/$id/lessons/$lessonId"
                          params={{ id: featured.id, lessonId: featuredLesson.id }}
                        >
                          <Play className="h-4 w-4" /> Resume lesson
                        </Link>
                      </Button>
                    ) : null}
                    <Button asChild variant="outline">
                      <Link to="/learn/courses/$id" params={{ id: featured.id }}>
                        View course
                      </Link>
                    </Button>
                    <Button asChild variant="ghost" className="text-muted-foreground">
                      <Link to="/learn/tutor">
                        <Sparkles className="h-4 w-4" /> Ask AI tutor
                      </Link>
                    </Button>
                  </div>
                </div>
                <div
                  className={cn(
                    "relative hidden min-h-full bg-gradient-to-br md:block",
                    featured.accent,
                  )}
                >
                  <BookOpen className="absolute right-6 top-6 h-10 w-10 text-foreground/20" />
                  <Play className="absolute bottom-6 left-6 h-14 w-14 rounded-2xl bg-background/70 p-3.5 text-primary shadow-pop backdrop-blur" />
                </div>
              </div>
            </section>
          ) : null}

          <SectionCard
            title="My courses"
            description="Pick up where you left off"
            action={
              <Button asChild variant="ghost" size="sm">
                <Link to="/learn/courses">
                  Browse all <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            }
            bodyClassName="divide-y divide-border p-0"
          >
            {myCourses.map((c) => (
              <Link
                key={c.id}
                to="/learn/courses/$id"
                params={{ id: c.id }}
                className="flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-muted/50"
              >
                <span
                  className={cn(
                    "grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br",
                    c.accent,
                  )}
                >
                  <BookOpen className="h-4.5 w-4.5 text-foreground/50" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium">{c.title}</span>
                  <span className="mt-1.5 flex items-center gap-2">
                    <Progress value={c.progress} className="h-1.5 w-24 sm:w-36" />
                    <span className="text-xs tabular-nums text-muted-foreground">{c.progress}%</span>
                  </span>
                </span>
                {c.progress === 100 ? (
                  <span className="rounded-full border border-success/25 bg-success-soft px-2 py-0.5 text-xs font-semibold text-success">
                    Done
                  </span>
                ) : (
                  <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                )}
              </Link>
            ))}
          </SectionCard>
        </div>

        <div className="space-y-6">
          <SectionCard title="This week" description="Minutes studied per day">
            <div className="h-44">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyActivity} margin={{ left: -8, right: 6, top: 6 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                  <XAxis
                    dataKey="day"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 12, fill: "var(--color-muted-foreground)" }}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 12,
                      border: "1px solid var(--color-border)",
                      background: "var(--color-popover)",
                      color: "var(--color-popover-foreground)",
                      fontSize: 12,
                    }}
                    cursor={{ stroke: "var(--color-border)" }}
                    formatter={(v) => [`${v} min`, "Study time"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="minutes"
                    stroke="var(--color-primary)"
                    strokeWidth={2.5}
                    fill="var(--color-primary)"
                    fillOpacity={0.15}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </SectionCard>

          <SectionCard title="Weak topics" description="Lowest accuracy this month">
            <div className="space-y-3.5">
              {weakTopics.map((w) => (
                <div key={w.topic}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{w.topic}</span>
                    <span className="tabular-nums text-muted-foreground">{w.accuracy}%</span>
                  </div>
                  <Progress value={w.accuracy} className="mt-1.5 h-1.5" />
                </div>
              ))}
            </div>
            <Button asChild variant="outline" size="sm" className="mt-5 w-full">
              <Link to="/learn/practice/session" search={{ mode: "weak" }}>
                <BrainCircuit className="h-4 w-4" /> Drill weak topics
              </Link>
            </Button>
          </SectionCard>

          <SectionCard title="Tests for you" description="Published assessments" bodyClassName="space-y-3">
            {upcoming.map((t) => (
              <div key={t.id} className="rounded-xl border border-border p-3.5">
                <p className="text-sm font-medium leading-snug">{t.title}</p>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {t.questions} questions · {t.duration} min
                </p>
                <Button asChild size="sm" variant="secondary" className="mt-2.5 w-full">
                  <Link to="/learn/tests/$testId" params={{ testId: t.id }}>
                    Start test
                  </Link>
                </Button>
              </div>
            ))}
          </SectionCard>
        </div>
      </div>

      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Recommended next</h2>
          <Button asChild variant="ghost" size="sm">
            <Link to="/learn/courses">
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {recommended.map((c) => (
            <Link
              key={c.id}
              to="/learn/courses/$id"
              params={{ id: c.id }}
              className="surface group overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-pop"
            >
              <div className={cn("relative h-20 bg-gradient-to-br", c.accent)}>
                <span className="absolute left-4 top-4">
                  <LevelBadge level={c.level} />
                </span>
                <BookOpen className="absolute bottom-3 right-4 h-6 w-6 text-foreground/20" />
              </div>
              <div className="p-4">
                <h3 className="truncate text-sm font-semibold group-hover:text-primary">{c.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  {c.lessons} lessons · {c.questions} questions
                </p>
                {c.progress > 0 ? (
                  <Progress value={c.progress} className="mt-3 h-1.5" />
                ) : (
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary">
                    Start learning <ArrowRight className="h-3 w-3" />
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
