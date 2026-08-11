import { createFileRoute } from "@tanstack/react-router";
import { FileCode2, FileText, Film, Newspaper, Plus, Presentation } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PageHeader, StatusBadge } from "@/components/primitives";
import { resources } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/resources")({
  head: () => ({
    meta: [
      { title: "Learning resources — CSharpHub Studio" },
      { name: "description", content: "PDFs, videos, articles and code samples attached to C# lessons." },
      { property: "og:title", content: "Learning resources — CSharpHub Studio" },
      { property: "og:description", content: "PDFs, videos, articles and code samples attached to C# lessons." },
    ],
  }),
  component: ResourcesPage,
});

const icons = { PDF: FileText, Video: Film, Article: Newspaper, "Code Sample": FileCode2, "Slide Deck": Presentation };

function ResourcesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Learning resources"
        description="Supplementary material attached to C# lessons."
        actions={<Button onClick={() => toast("Upload resource")}><Plus className="h-4 w-4" /> Add resource</Button>}
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {resources.map((r) => {
          const Icon = icons[r.type];
          return (
            <article key={r.id} className="surface p-5 transition-all hover:-translate-y-0.5 hover:shadow-pop">
              <div className="flex items-start justify-between gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-info-soft text-info"><Icon className="h-5 w-5" /></span>
                <StatusBadge status={r.status} />
              </div>
              <h3 className="mt-3 font-semibold leading-snug">{r.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{r.course} · {r.lesson}</p>
              <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground">
                <span>{r.type} · {r.size}</span><span>{r.addedAt}</span>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
