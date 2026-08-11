import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Clock, FileText, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AIBadge, PageHeader, StatusBadge } from "@/components/primitives";
import { chapters } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/lessons/")({
  head: () => ({
    meta: [
      { title: "Lessons — CSharpHub Studio" },
      { name: "description", content: "Every C# lesson across all courses, with status, duration and AI provenance." },
      { property: "og:title", content: "Lessons — CSharpHub Studio" },
      { property: "og:description", content: "Every C# lesson across all courses, with status, duration and AI provenance." },
    ],
  }),
  component: LessonsPage,
});

function LessonsPage() {
  const [q, setQ] = useState("");
  const rows = chapters.flatMap((ch) => ch.lessons.map((l) => ({ ...l, chapter: ch.title })))
    .filter((l) => l.title.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Lessons"
        description="All C# lesson content, from “What is C#?” to “async / await”."
        actions={<Button asChild><Link to="/admin/lessons/$id" params={{ id: "l-16" }}><Plus className="h-4 w-4" /> New lesson</Link></Button>}
      />
      <div className="surface overflow-hidden">
        <div className="border-b border-border p-4">
          <div className="relative max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search lessons…" className="pl-9" />
          </div>
        </div>
        <ul className="divide-y divide-border">
          {rows.map((l) => (
            <li key={l.id} className="flex flex-wrap items-center gap-3 px-5 py-3.5 transition-colors hover:bg-muted/40">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-secondary text-muted-foreground">
                <FileText className="h-4 w-4" />
              </span>
              <Link to="/admin/lessons/$id" params={{ id: l.id }} className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold hover:text-primary">{l.title}</span>
                <span className="block truncate text-xs text-muted-foreground">{l.chapter} · /{l.slug}</span>
              </Link>
              {l.aiGenerated ? <AIBadge label="AI" /> : null}
              <span className="flex items-center gap-1 text-xs text-muted-foreground"><Clock className="h-3.5 w-3.5" />{l.minutes}m</span>
              <StatusBadge status={l.status} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
