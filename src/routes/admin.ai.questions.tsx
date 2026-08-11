import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Check, Pencil, RefreshCw, Sparkles, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AIBadge, DifficultyBadge, PageHeader, SectionCard } from "@/components/primitives";
import { courses, questions } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/ai/questions")({
  head: () => ({
    meta: [
      { title: "AI Question Generator — CSharpHub Studio" },
      { name: "description", content: "Generate C# and OOP questions with options and explanations, then approve them into the bank." },
      { property: "og:title", content: "AI Question Generator — CSharpHub Studio" },
      { property: "og:description", content: "Generate C# and OOP questions with options and explanations, then approve them into the bank." },
    ],
  }),
  component: AIQuestions,
});

const flow = ["AI generated", "Draft", "Review", "Approved", "Published"];

function AIQuestions() {
  const [items, setItems] = useState(questions.filter((q) => q.aiGenerated).slice(0, 4));

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow={<span className="mb-2 inline-block"><AIBadge label="AI assisted" /></span>}
        title="AI Question Generator"
        description="Generated questions never publish automatically — they enter the review workflow."
      />

      <div className="surface flex flex-wrap items-center gap-2 p-4">
        {flow.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <span className={cn("rounded-full px-3 py-1 text-xs font-semibold", i === 0 ? "bg-brand-soft text-brand" : i === 4 ? "bg-success-soft text-success" : "bg-secondary text-muted-foreground")}>{s}</span>
            {i < flow.length - 1 ? <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" /> : null}
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[360px_minmax(0,1fr)]">
        <SectionCard title="Generation setup" bodyClassName="space-y-4 p-5">
          <div className="space-y-1.5">
            <Label>Course</Label>
            <Select defaultValue={courses[1]!.id}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>{courses.map((c) => (<SelectItem key={c.id} value={c.id}>{c.title}</SelectItem>))}</SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5"><Label>Chapter</Label><Input defaultValue="Inheritance & Polymorphism" /></div>
          <div className="space-y-1.5"><Label>Lesson</Label><Input defaultValue="Interfaces" /></div>
          <div className="space-y-1.5"><Label>Topic</Label><Input defaultValue="Interface vs abstract class" /></div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label>Question type</Label>
              <Select defaultValue="Single Choice">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {["Single Choice", "Multiple Choice", "True / False", "Fill in the Blank", "Mixed"].map((t) => (<SelectItem key={t} value={t}>{t}</SelectItem>))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Difficulty</Label>
              <Select defaultValue="Medium">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Easy">Easy</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-1.5"><Label>Number of questions</Label><Input type="number" defaultValue={8} min={1} max={50} /></div>
          <div className="space-y-1.5"><Label>Additional instructions</Label><Textarea rows={3} defaultValue="Include one code-reading question using a C# snippet." /></div>
          <Button size="lg" className="w-full" onClick={() => toast.success("8 questions generated", { description: "Waiting for your review." })}>
            <Sparkles className="h-4 w-4" /> Generate questions
          </Button>
        </SectionCard>

        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">{items.length} generated questions pending your decision</p>
            <Button size="sm" onClick={() => toast.success("All questions approved into the bank")}>
              <Check className="h-4 w-4" /> Approve all & save to bank
            </Button>
          </div>
          {items.map((q) => (
            <article key={q.id} className="surface p-5">
              <div className="flex flex-wrap items-center gap-2">
                <AIBadge />
                <DifficultyBadge difficulty={q.difficulty} />
                <span className="text-xs text-muted-foreground">{q.type} · {q.lesson}</span>
              </div>
              <p className="mt-3 font-semibold leading-relaxed">{q.content}</p>
              <ul className="mt-3 space-y-2">
                {q.options.map((o, i) => (
                  <li key={o.id} className={cn("flex items-center gap-3 rounded-xl border p-3 text-sm", o.correct ? "border-success/40 bg-success-soft" : "border-border")}>
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-current text-[0.65rem] font-bold">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="min-w-0 flex-1">{o.text}</span>
                    {o.correct ? <Check className="h-4 w-4 shrink-0 text-success" /> : null}
                  </li>
                ))}
              </ul>
              <p className="mt-3 rounded-xl bg-muted/60 p-3 text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">Explanation · </span>{q.explanation}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button size="sm" variant="outline" onClick={() => toast("Opening question editor")}><Pencil className="h-4 w-4" /> Edit</Button>
                <Button size="sm" variant="outline" onClick={() => toast("Regenerating…")}><RefreshCw className="h-4 w-4" /> Regenerate</Button>
                <Button size="sm" variant="outline" className="text-destructive" onClick={() => setItems((s) => s.filter((x) => x.id !== q.id))}>
                  <Trash2 className="h-4 w-4" /> Delete
                </Button>
                <Button size="sm" className="ml-auto" onClick={() => toast.success("Approved and saved to bank")}>
                  <Check className="h-4 w-4" /> Approve
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
