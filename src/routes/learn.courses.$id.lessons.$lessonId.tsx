import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  CheckCircle2,
  Circle,
  Clock,
  Lightbulb,
  PlayCircle,
  Target,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AIBadge, CodeBlock, EmptyState, SectionCard } from "@/components/primitives";
import {
  chaptersOf,
  getCourse,
  lessonContent,
  sampleCode,
  type Lesson,
} from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { BookOpen } from "lucide-react";

export const Route = createFileRoute("/learn/courses/$id/lessons/$lessonId")({
  head: ({ params }) => {
    const course = getCourse(params.id);
    const lesson = chaptersOf(params.id)
      .flatMap((c) => c.lessons)
      .find((l) => l.id === params.lessonId);
    return {
      meta: [
        { title: `${lesson?.title ?? "Lesson"} — CSharpHub` },
        {
          name: "description",
          content: `Lesson from ${course.title}: ${lesson?.title ?? "read the lesson"}.`,
        },
        { property: "og:title", content: `${lesson?.title ?? "Lesson"} — CSharpHub` },
        {
          property: "og:description",
          content: `Lesson from ${course.title}: ${lesson?.title ?? "read the lesson"}.`,
        },
      ],
    };
  },
  component: LessonReader,
});

function buildContent(lesson: Lesson, courseTitle: string) {
  if (lesson.slug === "encapsulation-practice") {
    return {
      intro: lessonContent.intro,
      objectives: lessonContent.objectives,
      callout: lessonContent.callout,
      idea: "Public fields feel convenient until the first time outside code puts an object into a state it should never be in — a bank account with a negative balance, a student with −3 credits. Encapsulation moves those rules into the class itself: fields become private, and the only way in is through members that validate. The result is code you can reason about one class at a time.",
    };
  }
  return {
    intro: `${lesson.title} is a core building block of ${courseTitle}. In this lesson you will build the concept up from first principles, see it working in real C# code, and finish with a short exercise you can try in any .NET project.`,
    objectives: [
      `Explain what ${lesson.title.toLowerCase()} is and when to reach for it`,
      `Read and write C# code that uses ${lesson.title.toLowerCase()} idiomatically`,
      "Spot and avoid the mistakes beginners make most often",
    ],
    idea: `Every C# feature exists to make one kind of problem disappear. ${lesson.title} is no different: once you see the awkward code it replaces, the syntax stops feeling like ceremony and starts feeling like a tool. Keep the Student class below in mind as a running example — you will extend it in the exercise at the end of this lesson.`,
    callout:
      "Tip: type every example by hand in a scratch console project instead of copy-pasting. Typing is slower, but retention roughly doubles — and noticing compiler errors is where the real learning happens.",
  };
}

function LessonReader() {
  const { id, lessonId } = Route.useParams();
  const navigate = useNavigate();
  const course = getCourse(id);
  const chs = chaptersOf(id);
  const chapter = chs.find((c) => c.lessons.some((l) => l.id === lessonId)) ?? chs[0];
  const flat = chs.flatMap((c) => c.lessons);
  const idx = Math.max(0, flat.findIndex((l) => l.id === lessonId));
  const lesson = flat[idx];
  const prev = idx > 0 ? flat[idx - 1] : undefined;
  const next = idx < flat.length - 1 ? flat[idx + 1] : undefined;
  const doneCount = Math.round((course.progress / 100) * flat.length);
  const [done, setDone] = useState(idx < doneCount);

  if (!chapter || !lesson) {
    return (
      <EmptyState
        icon={BookOpen}
        title="Lesson not available yet"
        description="This lesson is still being written. Explore the rest of the course in the meantime."
        action={
          <Button asChild>
            <Link to="/learn/courses/$id" params={{ id: course.id }}>
              Back to course
            </Link>
          </Button>
        }
      />
    );
  }

  const content = buildContent(lesson, course.title);

  function markComplete() {
    if (!done) {
      setDone(true);
      toast.success("Lesson marked complete", {
        description: "Nice work — keep the momentum going.",
      });
    }
    if (next) {
      void navigate({
        to: "/learn/courses/$id/lessons/$lessonId",
        params: { id: course.id, lessonId: next.id },
      });
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <Link
          to="/learn/courses/$id"
          params={{ id: course.id }}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> {course.title}
        </Link>
        <span className="hidden text-xs text-muted-foreground sm:block">
          Chapter {chapter.index} · {chapter.title}
        </span>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
        <article className="surface p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-md bg-secondary px-2 py-0.5 text-xs font-semibold text-secondary-foreground">
              <Clock className="h-3 w-3" /> {lesson.minutes} min read
            </span>
            {lesson.aiGenerated ? <AIBadge /> : null}
            {done ? (
              <span className="inline-flex items-center gap-1 rounded-md border border-success/25 bg-success-soft px-2 py-0.5 text-xs font-semibold text-success">
                <CheckCircle2 className="h-3 w-3" /> Completed
              </span>
            ) : null}
          </div>

          <h1 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">{lesson.title}</h1>
          <p className="mt-3 leading-7 text-muted-foreground">{content.intro}</p>

          <div className="mt-6 rounded-xl border border-primary/20 bg-primary-soft/50 p-4">
            <p className="flex items-center gap-2 text-sm font-semibold text-primary">
              <Target className="h-4 w-4" /> What you&apos;ll learn
            </p>
            <ul className="mt-2.5 space-y-1.5">
              {content.objectives.map((o) => (
                <li key={o} className="flex items-start gap-2 text-sm leading-6">
                  <CheckCircle2 className="mt-1 h-3.5 w-3.5 shrink-0 text-primary" />
                  <span>{o}</span>
                </li>
              ))}
            </ul>
          </div>

          <h2 className="mt-8 text-lg font-semibold">The big idea</h2>
          <p className="mt-2 leading-7 text-muted-foreground">{content.idea}</p>

          <div className="mt-5">
            <CodeBlock code={sampleCode} filename={`${lesson.slug}.cs`} />
          </div>

          <div className="mt-6 flex gap-3 rounded-xl border border-brand/20 bg-brand-soft/50 p-4">
            <Lightbulb className="h-5 w-5 shrink-0 text-brand" />
            <p className="text-sm leading-6">{content.callout}</p>
          </div>

          <h2 className="mt-8 text-lg font-semibold">Try it yourself</h2>
          <div className="mt-3 rounded-xl border border-dashed border-border bg-muted/40 p-4 text-sm leading-6 text-muted-foreground">
            Create a new console app and reproduce the example above. Then change one rule — for
            example, reject empty names as well as non-positive credits — and update the validation
            to match.
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6">
            {prev ? (
              <Button asChild variant="outline">
                <Link
                  to="/learn/courses/$id/lessons/$lessonId"
                  params={{ id: course.id, lessonId: prev.id }}
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span className="max-w-[180px] truncate">{prev.title}</span>
                </Link>
              </Button>
            ) : (
              <span />
            )}
            <Button onClick={markComplete} disabled={done && !next}>
              {done ? "Completed" : next ? "Mark complete & continue" : "Mark complete"}
              {next ? <ArrowRight className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
            </Button>
          </div>
        </article>

        <aside className="space-y-6">
          <SectionCard
            title={chapter.title}
            description="Lessons in this chapter"
            bodyClassName="space-y-1 p-3"
          >
            {chapter.lessons.map((l) => {
              const fIdx = flat.findIndex((f) => f.id === l.id);
              const lDone = (fIdx > -1 && fIdx < doneCount) || (l.id === lesson.id && done);
              const current = l.id === lesson.id;
              return (
                <Link
                  key={l.id}
                  to="/learn/courses/$id/lessons/$lessonId"
                  params={{ id: course.id, lessonId: l.id }}
                  className={cn(
                    "flex items-center gap-2.5 rounded-lg px-2.5 py-2 transition-colors hover:bg-muted/60",
                    current && "bg-primary-soft/60",
                  )}
                >
                  {lDone ? (
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-success" />
                  ) : current ? (
                    <PlayCircle className="h-4 w-4 shrink-0 text-primary" />
                  ) : (
                    <Circle className="h-4 w-4 shrink-0 text-muted-foreground/30" />
                  )}
                  <span
                    className={cn(
                      "min-w-0 flex-1 truncate text-sm",
                      current ? "font-semibold" : lDone ? "text-muted-foreground" : "font-medium",
                    )}
                  >
                    {l.title}
                  </span>
                  <span className="shrink-0 text-xs text-muted-foreground">{l.minutes}m</span>
                </Link>
              );
            })}
          </SectionCard>

          <SectionCard title="Course progress">
            <div className="flex items-center gap-3">
              <Progress value={course.progress} className="h-2 flex-1" />
              <span className="text-sm font-semibold tabular-nums">{course.progress}%</span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              {doneCount} of {flat.length} lessons completed
            </p>
          </SectionCard>

          <SectionCard title="Stuck?">
            <p className="text-sm leading-6 text-muted-foreground">
              Ask the AI tutor to explain this lesson another way, with more examples.
            </p>
            <Button asChild variant="outline" className="mt-3 w-full">
              <Link to="/learn/tutor">
                <Bot className="h-4 w-4" /> Ask AI tutor
              </Link>
            </Button>
          </SectionCard>
        </aside>
      </div>
    </div>
  );
}
