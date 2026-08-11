import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { BookOpen, LayoutGrid, List, Plus, Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { EmptyState, LevelBadge, PageHeader, StatusBadge } from "@/components/primitives";
import { categories, courses, type Level, type Status } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/courses/")({
  head: () => ({
    meta: [
      { title: "Courses — CSharpHub Studio" },
      { name: "description", content: "Browse, filter and manage every C# and OOP course in the catalogue." },
      { property: "og:title", content: "Courses — CSharpHub Studio" },
      { property: "og:description", content: "Browse, filter and manage every C# and OOP course." },
    ],
  }),
  component: CoursesPage,
});

function CoursesPage() {
  const [view, setView] = useState<"grid" | "table">("grid");
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState("all");
  const [status, setStatus] = useState("all");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("updated");

  const rows = courses
    .filter((c) => c.title.toLowerCase().includes(query.toLowerCase()))
    .filter((c) => level === "all" || c.level === (level as Level))
    .filter((c) => status === "all" || c.status === (status as Status))
    .filter((c) => category === "all" || c.categoryId === category)
    .sort((a, b) =>
      sort === "title"
        ? a.title.localeCompare(b.title)
        : sort === "lessons"
          ? b.lessons - a.lessons
          : b.updatedAt.localeCompare(a.updatedAt),
    );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Courses"
        description="Every C# learning path, from first program to advanced async patterns."
        actions={
          <>
            <div className="hidden rounded-xl border border-border p-0.5 sm:flex">
              {(["grid", "table"] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  aria-label={v + " view"}
                  className={cn(
                    "grid h-8 w-9 place-items-center rounded-lg transition-colors",
                    view === v ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {v === "grid" ? <LayoutGrid className="h-4 w-4" /> : <List className="h-4 w-4" />}
                </button>
              ))}
            </div>
            <Button asChild>
              <Link to="/admin/courses/new">
                <Plus className="h-4 w-4" /> Create course
              </Link>
            </Button>
          </>
        }
      />

      <div className="surface flex flex-wrap items-center gap-3 p-4">
        <div className="relative min-w-0 flex-1 sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search courses…" className="pl-9" />
        </div>
        <SlidersHorizontal className="hidden h-4 w-4 text-muted-foreground lg:block" />
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-[190px]"><SelectValue placeholder="Category" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            {categories.map((c) => (
              <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={level} onValueChange={setLevel}>
          <SelectTrigger className="w-[150px]"><SelectValue placeholder="Level" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All levels</SelectItem>
            <SelectItem value="Beginner">Beginner</SelectItem>
            <SelectItem value="Intermediate">Intermediate</SelectItem>
            <SelectItem value="Advanced">Advanced</SelectItem>
          </SelectContent>
        </Select>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-[150px]"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="review">In review</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="published">Published</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="w-[160px]"><SelectValue placeholder="Sort" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="updated">Last updated</SelectItem>
            <SelectItem value="title">Title A–Z</SelectItem>
            <SelectItem value="lessons">Most lessons</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {rows.length === 0 ? (
        <EmptyState
          icon={BookOpen}
          title="No courses found"
          description="No course matches the current filters. Adjust them, or create a brand new C# course."
          action={
            <Button asChild>
              <Link to="/admin/courses/new">
                <Plus className="h-4 w-4" /> Create course
              </Link>
            </Button>
          }
        />
      ) : view === "grid" ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {rows.map((c) => (
            <Link
              key={c.id}
              to="/admin/courses/$id"
              params={{ id: c.id }}
              className="surface group flex flex-col overflow-hidden transition-all hover:-translate-y-1 hover:shadow-pop"
            >
              <div className={cn("relative h-32 bg-gradient-to-br", c.accent)}>
                <span className="absolute right-3 top-3">
                  <StatusBadge status={c.status} className="bg-background/85 backdrop-blur" />
                </span>
                <span className="absolute bottom-3 left-4 font-mono text-xs text-foreground/60">
                  /{c.slug}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center gap-2">
                  <LevelBadge level={c.level} />
                  <span className="text-xs text-muted-foreground">
                    {categories.find((cat) => cat.id === c.categoryId)?.name}
                  </span>
                </div>
                <h3 className="mt-2 font-semibold leading-snug group-hover:text-primary">{c.title}</h3>
                <p className="mt-1 line-clamp-2 flex-1 text-sm text-muted-foreground">{c.description}</p>
                <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground">
                  <span>{c.chapters} chapters · {c.lessons} lessons</span>
                  <span>Updated {c.updatedAt}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="surface overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Course</TableHead>
                <TableHead className="hidden md:table-cell">Category</TableHead>
                <TableHead>Level</TableHead>
                <TableHead className="hidden text-right lg:table-cell">Chapters</TableHead>
                <TableHead className="hidden text-right lg:table-cell">Lessons</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden xl:table-cell">Updated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((c) => (
                <TableRow key={c.id} className="group">
                  <TableCell>
                    <Link to="/admin/courses/$id" params={{ id: c.id }} className="flex items-center gap-3">
                      <span className={cn("h-10 w-14 shrink-0 rounded-lg bg-gradient-to-br", c.accent)} />
                      <span className="min-w-0">
                        <span className="block truncate font-semibold group-hover:text-primary">{c.title}</span>
                        <span className="block truncate font-mono text-xs text-muted-foreground">/{c.slug}</span>
                      </span>
                    </Link>
                  </TableCell>
                  <TableCell className="hidden text-sm text-muted-foreground md:table-cell">
                    {categories.find((cat) => cat.id === c.categoryId)?.name}
                  </TableCell>
                  <TableCell><LevelBadge level={c.level} /></TableCell>
                  <TableCell className="hidden text-right tabular-nums lg:table-cell">{c.chapters}</TableCell>
                  <TableCell className="hidden text-right tabular-nums lg:table-cell">{c.lessons}</TableCell>
                  <TableCell><StatusBadge status={c.status} /></TableCell>
                  <TableCell className="hidden text-sm text-muted-foreground xl:table-cell">{c.updatedAt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
