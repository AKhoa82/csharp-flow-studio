import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { BookOpen, FileQuestion, FileText, Layers, Library, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PageHeader, SectionCard, StatusBadge } from "@/components/primitives";
import { chapters, courses, questions, resources } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/search")({
  head: () => ({
    meta: [
      { title: "Search — CSharpHub Studio" },
      { name: "description", content: "Global search across C# courses, chapters, lessons, resources and questions." },
      { property: "og:title", content: "Search — CSharpHub Studio" },
      { property: "og:description", content: "Global search across C# courses, chapters, lessons, resources and questions." },
    ],
  }),
  component: SearchPage,
});

function SearchPage() {
  const [q, setQ] = useState("");
  const match = (s: string) => s.toLowerCase().includes(q.toLowerCase());
  const cs = courses.filter((c) => match(c.title));
  const chs = chapters.filter((c) => match(c.title));
  const ls = chapters.flatMap((c) => c.lessons).filter((l) => match(l.title));
  const qs = questions.filter((x) => match(x.content));
  const rs = resources.filter((r) => match(r.title));

  return (
    <div className="space-y-6">
      <PageHeader title="Search" description="One search across courses, chapters, lessons, resources and questions." />
      <div className="surface flex flex-wrap items-center gap-3 p-4">
        <div className="relative min-w-0 flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Try “polymorphism”, “LINQ”, “async”…" className="pl-9" />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-[170px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All content types</SelectItem>
            <SelectItem value="course">Courses</SelectItem>
            <SelectItem value="lesson">Lessons</SelectItem>
            <SelectItem value="question">Questions</SelectItem>
            <SelectItem value="resource">Resources</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all">
          <SelectTrigger className="w-[150px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any level</SelectItem>
            <SelectItem value="Beginner">Beginner</SelectItem>
            <SelectItem value="Intermediate">Intermediate</SelectItem>
            <SelectItem value="Advanced">Advanced</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <SectionCard title={`Courses · ${cs.length}`} bodyClassName="divide-y divide-border p-0">
        {cs.map((c) => (
          <Link key={c.id} to="/admin/courses/$id" params={{ id: c.id }} className="flex items-center gap-3 px-5 py-3 hover:bg-muted/50">
            <BookOpen className="h-4 w-4 shrink-0 text-primary" />
            <span className="min-w-0 flex-1 truncate text-sm font-medium">{c.title}</span>
            <StatusBadge status={c.status} />
          </Link>
        ))}
      </SectionCard>

      <SectionCard title={`Chapters · ${chs.length}`} bodyClassName="divide-y divide-border p-0">
        {chs.map((c) => (
          <div key={c.id} className="flex items-center gap-3 px-5 py-3">
            <Layers className="h-4 w-4 shrink-0 text-info" />
            <span className="min-w-0 flex-1 truncate text-sm font-medium">{c.title}</span>
            <span className="text-xs text-muted-foreground">{c.lessons.length} lessons</span>
          </div>
        ))}
      </SectionCard>

      <SectionCard title={`Lessons · ${ls.length}`} bodyClassName="divide-y divide-border p-0">
        {ls.map((l) => (
          <div key={l.id} className="flex items-center gap-3 px-5 py-3">
            <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
            <span className="min-w-0 flex-1 truncate text-sm font-medium">{l.title}</span>
            <StatusBadge status={l.status} />
          </div>
        ))}
      </SectionCard>

      <SectionCard title={`Questions · ${qs.length}`} bodyClassName="divide-y divide-border p-0">
        {qs.map((x) => (
          <div key={x.id} className="flex items-center gap-3 px-5 py-3">
            <FileQuestion className="h-4 w-4 shrink-0 text-brand" />
            <span className="min-w-0 flex-1 truncate text-sm">{x.content}</span>
            <span className="hidden text-xs text-muted-foreground sm:block">{x.type}</span>
          </div>
        ))}
      </SectionCard>

      <SectionCard title={`Resources · ${rs.length}`} bodyClassName="divide-y divide-border p-0">
        {rs.map((r) => (
          <div key={r.id} className="flex items-center gap-3 px-5 py-3">
            <Library className="h-4 w-4 shrink-0 text-info" />
            <span className="min-w-0 flex-1 truncate text-sm font-medium">{r.title}</span>
            <span className="text-xs text-muted-foreground">{r.type}</span>
          </div>
        ))}
      </SectionCard>
    </div>
  );
}
