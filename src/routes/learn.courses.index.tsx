import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, BookOpen, Clock, FileQuestion, Layers, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EmptyState, LevelBadge, PageHeader } from "@/components/primitives";
import { categories, courses } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/learn/courses/")({
  head: () => ({
    meta: [
      { title: "Browse courses — CSharpHub" },
      {
        name: "description",
        content:
          "Browse C# and OOP courses: fundamentals, collections, LINQ, exception handling and advanced topics.",
      },
      { property: "og:title", content: "Browse courses — CSharpHub" },
      {
        property: "og:description",
        content:
          "Browse C# and OOP courses: fundamentals, collections, LINQ, exception handling and advanced topics.",
      },
    ],
  }),
  component: BrowseCourses,
});

function BrowseCourses() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const [level, setLevel] = useState("all");

  const filtered = useMemo(
    () =>
      courses.filter(
        (c) =>
          (cat === "all" || c.categoryId === cat) &&
          (level === "all" || c.level === level) &&
          (q.trim() === "" ||
            `${c.title} ${c.description}`.toLowerCase().includes(q.toLowerCase())),
      ),
    [q, cat, level],
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Browse courses"
        description="Six learning paths — from your first console app to advanced asynchronous C#."
      />

      <div className="surface flex flex-wrap items-center gap-3 p-4">
        <div className="relative min-w-[220px] flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search courses…"
            className="pl-9"
          />
        </div>
        <Select value={level} onValueChange={setLevel}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All levels</SelectItem>
            <SelectItem value="Beginner">Beginner</SelectItem>
            <SelectItem value="Intermediate">Intermediate</SelectItem>
            <SelectItem value="Advanced">Advanced</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex flex-wrap gap-1.5">
          {[{ id: "all", name: "All" }, ...categories].map((c) => (
            <button
              key={c.id}
              onClick={() => setCat(c.id)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                cat === c.id
                  ? "border-primary bg-primary-soft text-primary"
                  : "border-border text-muted-foreground hover:bg-secondary",
              )}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={Search}
          title="No courses match"
          description="Try a different keyword, category or level filter."
        />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c) => (
            <Link
              key={c.id}
              to="/learn/courses/$id"
              params={{ id: c.id }}
              className="surface group flex flex-col overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-pop"
            >
              <div className={cn("relative h-28 bg-gradient-to-br", c.accent)}>
                <BookOpen className="absolute bottom-4 right-4 h-8 w-8 text-foreground/20" />
                <span className="absolute left-4 top-4">
                  <LevelBadge level={c.level} />
                </span>
                {c.progress === 100 ? (
                  <span className="absolute right-4 top-4 rounded-full border border-success/25 bg-success-soft px-2.5 py-0.5 text-xs font-semibold text-success">
                    Completed
                  </span>
                ) : null}
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-semibold leading-snug group-hover:text-primary">{c.title}</h3>
                <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">{c.description}</p>
                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Layers className="h-3.5 w-3.5" />
                    {c.lessons} lessons
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <FileQuestion className="h-3.5 w-3.5" />
                    {c.questions} questions
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />≈{Math.round((c.lessons * 12) / 60)} h
                  </span>
                </div>
                <div className="mt-4 flex-1 border-t border-border pt-4">
                  {c.progress > 0 && c.progress < 100 ? (
                    <div className="flex items-center gap-3">
                      <Progress value={c.progress} className="h-1.5 flex-1" />
                      <span className="text-xs font-semibold tabular-nums">{c.progress}%</span>
                    </div>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                      {c.progress === 100 ? "Review course" : "Start learning"}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
