import { createFileRoute } from "@tanstack/react-router";
import { FlaskConical, Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { DifficultyBadge, PageHeader } from "@/components/primitives";
import { tests } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/practice")({
  head: () => ({
    meta: [
      { title: "Practice sets — CSharpHub Studio" },
      { name: "description", content: "Untimed C# practice sets students can repeat to master weak topics." },
      { property: "og:title", content: "Practice sets — CSharpHub Studio" },
      { property: "og:description", content: "Untimed C# practice sets students can repeat to master weak topics." },
    ],
  }),
  component: PracticePage,
});

function PracticePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Practice sets"
        description="Untimed drills students can repeat as often as they like."
        actions={<Button onClick={() => toast("New practice set")}><Plus className="h-4 w-4" /> New practice set</Button>}
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {tests.map((t) => (
          <article key={t.id} className="surface p-5">
            <div className="flex items-start justify-between gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary-soft text-primary"><FlaskConical className="h-5 w-5" /></span>
              <DifficultyBadge difficulty={t.difficulty} />
            </div>
            <h3 className="mt-3 font-semibold leading-snug">{t.title}</h3>
            <p className="mt-1 text-xs text-muted-foreground">{t.course} · {t.questions} questions</p>
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Average score</span><span className="tabular-nums">{t.avgScore}%</span>
              </div>
              <Progress value={t.avgScore} className="mt-1.5 h-2" />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
