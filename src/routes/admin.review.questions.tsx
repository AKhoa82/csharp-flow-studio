import { createFileRoute } from "@tanstack/react-router";
import { Check, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AIBadge, DifficultyBadge, PageHeader, StatusBadge } from "@/components/primitives";
import { questions } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/review/questions")({
  head: () => ({
    meta: [
      { title: "Question review — CSharpHub Studio" },
      { name: "description", content: "Approve or reject C# questions before they enter tests and practice sets." },
      { property: "og:title", content: "Question review — CSharpHub Studio" },
      { property: "og:description", content: "Approve or reject C# questions before they enter tests and practice sets." },
    ],
  }),
  component: QuestionReview,
});

function QuestionReview() {
  const items = questions.filter((q) => q.status !== "published");
  return (
    <div className="space-y-6">
      <PageHeader title="Question review" description="Verify correctness, wording and explanations before questions go live." />
      <Tabs defaultValue="pending">
        <TabsList>
          {["all", "pending", "approved", "rejected"].map((t) => (<TabsTrigger key={t} value={t} className="capitalize">{t}</TabsTrigger>))}
        </TabsList>
      </Tabs>
      <div className="grid gap-4 xl:grid-cols-2">
        {items.map((q) => (
          <article key={q.id} className="surface p-5">
            <div className="flex flex-wrap items-center gap-2">
              {q.aiGenerated ? <AIBadge /> : null}
              <DifficultyBadge difficulty={q.difficulty} />
              <StatusBadge status={q.status} />
              <span className="text-xs text-muted-foreground">{q.type}</span>
            </div>
            <p className="mt-3 font-semibold leading-relaxed">{q.content}</p>
            <ul className="mt-3 space-y-1.5">
              {q.options.map((o, i) => (
                <li key={o.id} className={cn("rounded-lg border px-3 py-2 text-sm", o.correct ? "border-success/40 bg-success-soft" : "border-border")}>
                  <span className="mr-2 font-mono text-xs text-muted-foreground">{String.fromCharCode(65 + i)}</span>{o.text}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-muted-foreground">{q.explanation}</p>
            <div className="mt-4 flex gap-2">
              <Button size="sm" onClick={() => toast.success("Question approved")}><Check className="h-4 w-4" /> Approve</Button>
              <Button size="sm" variant="outline" className="text-destructive" onClick={() => toast.error("Question rejected", { description: "Reason required in the review panel." })}>
                <X className="h-4 w-4" /> Reject
              </Button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
