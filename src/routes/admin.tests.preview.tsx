import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { DifficultyBadge, PageHeader, SectionCard } from "@/components/primitives";
import { questions } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/tests/preview")({
  head: () => ({
    meta: [
      { title: "Test preview — CSharpHub Studio" },
      { name: "description", content: "See exactly how a C# test appears to students before publishing it." },
      { property: "og:title", content: "Test preview — CSharpHub Studio" },
      { property: "og:description", content: "See exactly how a C# test appears to students before publishing it." },
    ],
  }),
  component: TestPreview,
});

function TestPreview() {
  return (
    <div className="space-y-6">
      <Button asChild variant="ghost" size="sm" className="-ml-2 text-muted-foreground">
        <Link to="/admin/tests"><ArrowLeft className="h-4 w-4" /> Back to tests</Link>
      </Button>
      <PageHeader title="Preview: OOP Pillars Checkpoint" description="Student view — answers are shown for reviewers only." />
      <div className="surface flex flex-wrap items-center gap-4 p-4">
        <span className="flex items-center gap-1.5 text-sm font-semibold"><Clock className="h-4 w-4 text-primary" /> 35:00</span>
        <span className="text-sm text-muted-foreground">Question 1 of {questions.length}</span>
        <Progress value={20} className="h-2 min-w-[160px] flex-1" />
      </div>
      {questions.slice(0, 4).map((q, i) => (
        <SectionCard key={q.id} title={`Question ${i + 1}`} action={<DifficultyBadge difficulty={q.difficulty} />} bodyClassName="space-y-3 p-5">
          <p className="font-semibold">{q.content}</p>
          {q.options.map((o, oi) => (
            <div key={o.id} className="flex items-center gap-3 rounded-xl border border-border p-3 text-sm">
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border text-[0.65rem] font-bold">{String.fromCharCode(65 + oi)}</span>
              {o.text}
              {o.correct ? <span className="ml-auto text-xs font-semibold text-success">Correct</span> : null}
            </div>
          ))}
        </SectionCard>
      ))}
    </div>
  );
}
