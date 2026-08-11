import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Clock,
  FileQuestion,
  FileText,
  History,
  Library,
  ListChecks,
  Pencil,
  Rocket,
  Sparkles,
  Wand2,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  AIBadge,
  DifficultyBadge,
  EmptyState,
  LevelBadge,
  PageHeader,
  SectionCard,
  StatusBadge,
} from "@/components/primitives";
import { Curriculum } from "@/components/curriculum";
import { chaptersOf, courses, getCourse, questions, resources, tests } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/courses/$id")({
  head: () => ({
    meta: [
      { title: "Course detail — CSharpHub Studio" },
      { name: "description", content: "Course overview, curriculum, resources, questions, tests and review history." },
      { property: "og:title", content: "Course detail — CSharpHub Studio" },
      { property: "og:description", content: "Course overview, curriculum, resources, questions and tests." },
    ],
  }),
  component: CourseDetail,
});

const history = [
  { id: "h1", who: "Lan Nguyen", action: "Published course", time: "2026-08-09 14:22", tone: "success" },
  { id: "h2", who: "Minh Tran", action: "Approved 4 lessons in “Encapsulation”", time: "2026-08-08 09:10", tone: "info" },
  { id: "h3", who: "AI Generator", action: "Drafted lesson “Interfaces”", time: "2026-08-07 16:44", tone: "brand" },
  { id: "h4", who: "Minh Tran", action: "Rejected “goto statements” — needs examples", time: "2026-08-05 11:02", tone: "destructive" },
  { id: "h5", who: "Lan Nguyen", action: "Created course", time: "2026-01-28 08:30", tone: "muted" },
];

function CourseDetail() {
  const { id } = Route.useParams();
  const course = getCourse(id);
  const chapters = chaptersOf(course.id);
  const courseQuestions = questions.filter((q) => q.courseId === course.id);
  const courseTests = tests.filter((t) => t.course.includes(course.title.split(" ")[0] ?? ""));

  return (
    <div className="space-y-6">
      <Button asChild variant="ghost" size="sm" className="-ml-2 text-muted-foreground">
        <Link to="/admin/courses">
          <ArrowLeft className="h-4 w-4" /> All courses
        </Link>
      </Button>

      <div className={cn("surface overflow-hidden")}>
        <div className={cn("h-28 bg-gradient-to-br sm:h-36", course.accent)} />
        <div className="p-5 sm:p-6">
          <PageHeader
            eyebrow={
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <LevelBadge level={course.level} />
                <StatusBadge status={course.status} />
                <span className="font-mono text-xs text-muted-foreground">/{course.slug}</span>
              </div>
            }
            title={course.title}
            description={course.description}
            actions={
              <>
                <Button variant="outline" onClick={() => toast("Opening course editor")}>
                  <Pencil className="h-4 w-4" /> Edit
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/admin/ai/content">
                    <Wand2 className="h-4 w-4" /> AI tools
                  </Link>
                </Button>
                <Button onClick={() => toast.success("Course published", { description: course.title })}>
                  <Rocket className="h-4 w-4" /> Publish
                </Button>
              </>
            }
          />
          <dl className="mt-6 grid gap-4 border-t border-border pt-5 sm:grid-cols-2 lg:grid-cols-5">
            {[
              ["Author", course.author],
              ["Created", course.createdAt],
              ["Last updated", course.updatedAt],
              ["Chapters", `${course.chapters}`],
              ["Questions", `${course.questions}`],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-xs text-muted-foreground">{k}</dt>
                <dd className="text-sm font-semibold">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="w-full justify-start overflow-x-auto">
          {["overview", "chapters", "lessons", "resources", "questions", "tests", "ai", "history"].map((t) => (
            <TabsTrigger key={t} value={t} className="capitalize">
              {t === "ai" ? "AI tools" : t}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="overview" className="mt-4 grid gap-4 lg:grid-cols-3">
          <SectionCard title="Content completeness" className="lg:col-span-2" bodyClassName="space-y-5 p-5">
            {[
              { label: "Lessons written", value: 82, note: `${course.lessons} of 30 planned` },
              { label: "Questions linked", value: 64, note: `${course.questions} questions in bank` },
              { label: "Reviewed & approved", value: 47, note: "12 items pending review" },
              { label: "Resources attached", value: 35, note: "6 files, 2 videos" },
            ].map((row) => (
              <div key={row.label}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{row.label}</span>
                  <span className="tabular-nums text-muted-foreground">{row.value}%</span>
                </div>
                <Progress value={row.value} className="mt-2 h-2" />
                <p className="mt-1 text-xs text-muted-foreground">{row.note}</p>
              </div>
            ))}
          </SectionCard>

          <div className="space-y-4">
            <SectionCard title="At a glance" bodyClassName="grid grid-cols-2 gap-4 p-5">
              {[
                { icon: BookOpen, label: "Chapters", value: course.chapters },
                { icon: FileText, label: "Lessons", value: course.lessons },
                { icon: FileQuestion, label: "Questions", value: course.questions },
                { icon: ListChecks, label: "Tests", value: courseTests.length },
              ].map((s) => (
                <div key={s.label} className="rounded-xl bg-muted/50 p-3">
                  <s.icon className="h-4 w-4 text-primary" />
                  <p className="mt-2 text-xl font-bold tabular-nums">{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </SectionCard>
            <SectionCard title="Related courses" bodyClassName="space-y-2 p-3">
              {courses
                .filter((c) => c.id !== course.id)
                .slice(0, 3)
                .map((c) => (
                  <Link
                    key={c.id}
                    to="/admin/courses/$id"
                    params={{ id: c.id }}
                    className="flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-muted"
                  >
                    <span className={cn("h-9 w-12 shrink-0 rounded-lg bg-gradient-to-br", c.accent)} />
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-medium">{c.title}</span>
                      <span className="block text-xs text-muted-foreground">{c.lessons} lessons</span>
                    </span>
                  </Link>
                ))}
            </SectionCard>
          </div>
        </TabsContent>

        <TabsContent value="chapters" className="mt-4">
          {chapters.length ? (
            <Curriculum data={chapters} />
          ) : (
            <EmptyState
              icon={BookOpen}
              title="No chapters yet"
              description="Structure this course by adding your first chapter, then fill it with lessons."
              action={<Button onClick={() => toast.success("Chapter added")}>Add chapter</Button>}
            />
          )}
        </TabsContent>

        <TabsContent value="lessons" className="mt-4">
          <SectionCard title="All lessons" description="Across every chapter of this course" bodyClassName="p-0">
            <ul className="divide-y divide-border">
              {chapters.flatMap((ch) =>
                ch.lessons.map((l) => (
                  <li key={l.id} className="flex items-center gap-3 px-5 py-3 hover:bg-muted/40">
                    <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
                    <Link
                      to="/admin/lessons/$id"
                      params={{ id: l.id }}
                      className="min-w-0 flex-1 truncate text-sm font-medium hover:text-primary"
                    >
                      {l.title}
                    </Link>
                    <span className="hidden truncate text-xs text-muted-foreground sm:block">{ch.title}</span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" />
                      {l.minutes}m
                    </span>
                    <StatusBadge status={l.status} />
                  </li>
                )),
              )}
            </ul>
          </SectionCard>
        </TabsContent>

        <TabsContent value="resources" className="mt-4">
          <SectionCard title="Learning resources" bodyClassName="p-0">
            <ul className="divide-y divide-border">
              {resources.slice(0, 4).map((r) => (
                <li key={r.id} className="flex items-center gap-3 px-5 py-3.5">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-info-soft text-info">
                    <Library className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium">{r.title}</span>
                    <span className="block truncate text-xs text-muted-foreground">
                      {r.type} · {r.lesson} · {r.size}
                    </span>
                  </span>
                  <StatusBadge status={r.status} />
                </li>
              ))}
            </ul>
          </SectionCard>
        </TabsContent>

        <TabsContent value="questions" className="mt-4">
          <SectionCard
            title="Questions linked to this course"
            action={
              <Button asChild size="sm" variant="outline">
                <Link to="/admin/questions">Open bank</Link>
              </Button>
            }
            bodyClassName="p-0"
          >
            {courseQuestions.length ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead>Question</TableHead>
                      <TableHead className="hidden md:table-cell">Lesson</TableHead>
                      <TableHead>Difficulty</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {courseQuestions.map((q) => (
                      <TableRow key={q.id}>
                        <TableCell className="max-w-md">
                          <span className="line-clamp-1 text-sm font-medium">{q.content}</span>
                          <span className="text-xs text-muted-foreground">{q.type}</span>
                        </TableCell>
                        <TableCell className="hidden text-sm text-muted-foreground md:table-cell">{q.lesson}</TableCell>
                        <TableCell><DifficultyBadge difficulty={q.difficulty} /></TableCell>
                        <TableCell><StatusBadge status={q.status} /></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <EmptyState
                icon={FileQuestion}
                title="No questions yet"
                description="Create questions manually, or let the AI generator draft a set for review."
                action={
                  <Button asChild>
                    <Link to="/admin/ai/questions">
                      <Sparkles className="h-4 w-4" /> Generate with AI
                    </Link>
                  </Button>
                }
              />
            )}
          </SectionCard>
        </TabsContent>

        <TabsContent value="tests" className="mt-4">
          <SectionCard title="Tests & practice sets" bodyClassName="p-0">
            <ul className="divide-y divide-border">
              {(courseTests.length ? courseTests : tests.slice(0, 3)).map((t) => (
                <li key={t.id} className="flex flex-wrap items-center gap-3 px-5 py-3.5">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
                    <ListChecks className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium">{t.title}</span>
                    <span className="block text-xs text-muted-foreground">
                      {t.questions} questions · {t.duration} min
                    </span>
                  </span>
                  <DifficultyBadge difficulty={t.difficulty} />
                  <StatusBadge status={t.status} />
                </li>
              ))}
            </ul>
          </SectionCard>
        </TabsContent>

        <TabsContent value="ai" className="mt-4 grid gap-4 md:grid-cols-2">
          {[
            { title: "Generate a lesson", desc: "Draft a full lesson with examples and exercises for any chapter.", to: "/admin/ai/content" as const, icon: Wand2 },
            { title: "Generate questions", desc: "Create question sets with options and explanations, ready for review.", to: "/admin/ai/questions" as const, icon: Sparkles },
          ].map((c) => (
            <Link
              key={c.title}
              to={c.to}
              className="surface group flex items-start gap-4 p-5 transition-all hover:-translate-y-0.5 hover:shadow-pop"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand">
                <c.icon className="h-5 w-5" />
              </span>
              <span>
                <span className="block font-semibold group-hover:text-brand">{c.title}</span>
                <span className="mt-1 block text-sm text-muted-foreground">{c.desc}</span>
                <span className="mt-3 inline-block"><AIBadge label="Requires human review" /></span>
              </span>
            </Link>
          ))}
        </TabsContent>

        <TabsContent value="history" className="mt-4">
          <SectionCard title="Review history" description="Full audit trail for this course" bodyClassName="p-5">
            <ol className="relative space-y-6 border-l border-border pl-6">
              {history.map((h) => (
                <li key={h.id} className="relative">
                  <span
                    className={cn(
                      "absolute -left-[1.9rem] grid h-6 w-6 place-items-center rounded-full border-2 border-background",
                      h.tone === "success" && "bg-success text-success-foreground",
                      h.tone === "info" && "bg-info text-info-foreground",
                      h.tone === "brand" && "bg-brand text-brand-foreground",
                      h.tone === "destructive" && "bg-destructive text-destructive-foreground",
                      h.tone === "muted" && "bg-secondary text-muted-foreground",
                    )}
                  >
                    {h.tone === "brand" ? <Sparkles className="h-3 w-3" /> : h.tone === "muted" ? <History className="h-3 w-3" /> : <CheckCircle2 className="h-3 w-3" />}
                  </span>
                  <p className="text-sm font-medium">{h.action}</p>
                  <p className="text-xs text-muted-foreground">
                    {h.who} · {h.time}
                  </p>
                </li>
              ))}
            </ol>
          </SectionCard>
        </TabsContent>
      </Tabs>
    </div>
  );
}
