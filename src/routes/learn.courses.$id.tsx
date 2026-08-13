import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Circle,
  Clock,
  Download,
  FileQuestion,
  Layers,
  PlayCircle,
  Target,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AIBadge, EmptyState, LevelBadge, SectionCard } from "@/components/primitives";
import { chaptersOf, getCourse, resources, tests } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/learn/courses/$id")({
  head: ({ params }) => {
    const c = getCourse(params.id);
    return {
      meta: [
        { title: `${c.title} — CSharpHub` },
        { name: "description", content: c.description },
        { property: "og:title", content: `${c.title} — CSharpHub` },
        { property: "og:description", content: c.description },
      ],
    };
  },
  component: CourseDetail,
});

const courseAliases: Record<string, string> = {
  "csharp-fundamentals": "C# Fundamentals",
  "oop-in-csharp": "OOP in C#",
  "collections-and-linq": "Collections and LINQ",
  "exception-handling": "Exception Handling in C#",
};

function CourseDetail() {
  const { id } = Route.useParams();
  const course = getCourse(id);
  const chs = chaptersOf(course.id);
  const flat = chs.flatMap((ch) => ch.lessons.map((l) => ({ ...l, chapter: ch.title })));
  const doneCount = Math.round((course.progress / 100) * flat.length);
  const currentIdx = Math.min(doneCount, Math.max(flat.length - 1, 0));
  const nextLesson = course.progress < 100 ? flat[currentIdx] : undefined;
  const alias = courseAliases[course.id];
  const courseTests = tests.filter(
    (t) => t.course === course.title || (alias !== undefined && t.course === alias),
  );
  const courseResources = resources.filter(
    (r) => r.course === course.title || (alias !== undefined && r.course === alias),
  );
  const initials = course.author
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="space-y-6">
      <Link
        to="/learn/courses"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> All courses
      </Link>

      <section className="surface overflow-hidden">
        <div className={cn("relative h-32 bg-gradient-to-br sm:h-40", course.accent)}>
          <BookOpen className="absolute bottom-5 right-6 h-12 w-12 text-foreground/15" />
        </div>
        <div className="p-6 sm:p-7">
          <div className="flex flex-wrap items-center gap-2">
            <LevelBadge level={course.level} />
            <span className="text-xs text-muted-foreground">Updated {course.updatedAt}</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">{course.title}</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {course.description}
          </p>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Layers className="h-4 w-4 text-primary" />
              {course.lessons} lessons
            </span>
            <span className="inline-flex items-center gap-1.5">
              <FileQuestion className="h-4 w-4 text-primary" />
              {course.questions} practice questions
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-primary" />≈ {Math.round((course.lessons * 12) / 60)}{" "}
              hours
            </span>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            {course.progress > 0 ? (
              <div className="flex min-w-[220px] flex-1 items-center gap-3">
                <Progress value={course.progress} className="h-2 max-w-md flex-1" />
                <span className="text-sm font-semibold tabular-nums">{course.progress}%</span>
              </div>
            ) : null}
            <div className="flex flex-wrap gap-2">
              {nextLesson ? (
                <Button asChild>
                  <Link
                    to="/learn/courses/$id/lessons/$lessonId"
                    params={{ id: course.id, lessonId: nextLesson.id }}
                  >
                    <PlayCircle className="h-4 w-4" />
                    {course.progress > 0 ? "Continue course" : "Start course"}
                  </Link>
                </Button>
              ) : null}
              <Button asChild variant={nextLesson ? "outline" : "default"}>
                <Link
                  to="/learn/practice/session"
                  search={{ course: course.id, mode: "course" }}
                >
                  <Target className="h-4 w-4" /> Practice questions
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <SectionCard
            title="Curriculum"
            description={`${chs.length} chapters · ${flat.length} lessons available now`}
            bodyClassName="p-3"
          >
            {chs.length === 0 ? (
              <EmptyState
                icon={BookOpen}
                title="Curriculum coming soon"
                description="This course is still being authored. Check back shortly."
              />
            ) : (
              <Accordion type="multiple" defaultValue={chs.map((c) => c.id)} className="w-full">
                {chs.map((ch) => (
                  <AccordionItem key={ch.id} value={ch.id} className="border-border">
                    <AccordionTrigger className="px-2 hover:no-underline">
                      <span className="flex min-w-0 items-center gap-3 text-left">
                        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-secondary text-xs font-bold text-secondary-foreground">
                          {ch.index}
                        </span>
                        <span className="min-w-0">
                          <span className="block truncate text-sm font-semibold">{ch.title}</span>
                          <span className="block truncate text-xs font-normal text-muted-foreground">
                            {ch.summary}
                          </span>
                        </span>
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-2">
                      <div className="space-y-1">
                        {ch.lessons.map((l) => {
                          const i = flat.findIndex((f) => f.id === l.id);
                          const done = i > -1 && i < doneCount;
                          const current = i === currentIdx && course.progress < 100;
                          return (
                            <Link
                              key={l.id}
                              to="/learn/courses/$id/lessons/$lessonId"
                              params={{ id: course.id, lessonId: l.id }}
                              className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-muted/60",
                                current && "bg-primary-soft/60",
                              )}
                            >
                              {done ? (
                                <CheckCircle2 className="h-4.5 w-4.5 shrink-0 text-success" />
                              ) : current ? (
                                <PlayCircle className="h-4.5 w-4.5 shrink-0 text-primary" />
                              ) : (
                                <Circle className="h-4.5 w-4.5 shrink-0 text-muted-foreground/30" />
                              )}
                              <span className="min-w-0 flex-1">
                                <span
                                  className={cn(
                                    "block truncate text-sm",
                                    done ? "text-muted-foreground" : "font-medium",
                                  )}
                                >
                                  {l.title}
                                </span>
                              </span>
                              {l.aiGenerated ? <AIBadge /> : null}
                              <span className="shrink-0 text-xs text-muted-foreground">
                                {l.minutes} min
                              </span>
                            </Link>
                          );
                        })}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </SectionCard>
        </div>

        <aside className="space-y-6">
          <SectionCard title="Instructor">
            <div className="flex items-center gap-3">
              <Avatar className="h-11 w-11">
                <AvatarFallback className="bg-brand-soft font-bold text-brand">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-semibold">{course.author}</p>
                <p className="text-xs text-muted-foreground">Content author · C# instructor</p>
              </div>
            </div>
          </SectionCard>

          <SectionCard
            title="Tests"
            description={`${courseTests.length} available`}
            bodyClassName="space-y-3"
          >
            {courseTests.length === 0 ? (
              <p className="text-sm text-muted-foreground">No tests for this course yet.</p>
            ) : (
              courseTests.map((t) => (
                <div key={t.id} className="rounded-xl border border-border p-3.5">
                  <p className="text-sm font-medium leading-snug">{t.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {t.questions} questions · {t.duration} min
                    {t.attempts > 0 ? ` · avg ${t.avgScore}%` : ""}
                  </p>
                  <Button asChild size="sm" className="mt-3 w-full">
                    <Link to="/learn/tests/$testId" params={{ testId: t.id }}>
                      Start test
                    </Link>
                  </Button>
                </div>
              ))
            )}
          </SectionCard>

          <SectionCard title="Resources" bodyClassName="space-y-1 p-3">
            {courseResources.length === 0 ? (
              <p className="px-2 py-1 text-sm text-muted-foreground">No resources yet.</p>
            ) : (
              courseResources.map((r) => (
                <button
                  key={r.id}
                  className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left transition-colors hover:bg-muted/60"
                >
                  <Download className="h-4 w-4 shrink-0 text-info" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm">{r.title}</span>
                    <span className="text-xs text-muted-foreground">
                      {r.type} · {r.size}
                    </span>
                  </span>
                </button>
              ))
            )}
          </SectionCard>
        </aside>
      </div>
    </div>
  );
}
