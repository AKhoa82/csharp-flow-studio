import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Clock, Cpu, RefreshCw, Save, Send, Sparkles, Wand2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Skeleton } from "@/components/ui/skeleton";
import { AIBadge, CodeBlock, PageHeader, SectionCard } from "@/components/primitives";
import { chapters, courses, lessonContent, sampleCode } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/ai/content")({
  head: () => ({
    meta: [
      { title: "AI Learning Content Generator — CSharpHub Studio" },
      { name: "description", content: "Generate C# lessons, explanations, examples and exercises with AI, then review before publishing." },
      { property: "og:title", content: "AI Learning Content Generator — CSharpHub Studio" },
      { property: "og:description", content: "Generate C# lessons, explanations, examples and exercises with AI, then review before publishing." },
    ],
  }),
  component: AIContent,
});

function AIContent() {
  const [state, setState] = useState<"idle" | "loading" | "done">("done");

  const generate = () => {
    setState("loading");
    toast("Generating content…");
    setTimeout(() => {
      setState("done");
      toast.success("Draft generated", { description: "AI generated — requires review." });
    }, 1400);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow={<span className="mb-2 inline-block"><AIBadge label="AI assisted" /></span>}
        title="AI Learning Content Generator"
        description="Draft lessons, explanations, C# examples and exercises. Everything lands as a draft that a human must review."
      />

      <div className="grid gap-4 lg:grid-cols-[380px_minmax(0,1fr)]">
        <SectionCard title="Generation setup" bodyClassName="space-y-4 p-5">
          <div className="space-y-1.5">
            <Label>Topic</Label>
            <Input defaultValue="Encapsulation in C#" />
          </div>
          <div className="space-y-1.5">
            <Label>Course</Label>
            <Select defaultValue={courses[1]!.id}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>{courses.map((c) => (<SelectItem key={c.id} value={c.id}>{c.title}</SelectItem>))}</SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>Chapter</Label>
            <Select defaultValue={chapters[5]!.id}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>{chapters.map((c) => (<SelectItem key={c.id} value={c.id}>{c.title}</SelectItem>))}</SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>Lesson</Label>
            <Input defaultValue="Encapsulation in Practice" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label>Target level</Label>
              <Select defaultValue="Intermediate">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Content type</Label>
              <Select defaultValue="Lesson">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {["Lesson", "Explanation", "C# Example", "Exercise", "Summary", "Learning objectives"].map((t) => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Desired length — ~900 words</Label>
            <Slider defaultValue={[60]} max={100} step={5} />
          </div>
          <div className="space-y-1.5">
            <Label>Additional instructions</Label>
            <Textarea rows={3} defaultValue="Use a BankAccount example. Include one common mistake and how to fix it." />
          </div>
          <Button className="w-full" size="lg" onClick={generate}>
            <Wand2 className="h-4 w-4" /> Generate content with AI
          </Button>
        </SectionCard>

        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2 rounded-xl border border-warning/30 bg-warning-soft px-4 py-3 text-sm text-warning-foreground">
            <Sparkles className="h-4 w-4" />
            <span className="font-semibold">AI generated — requires review.</span>
            <span className="text-warning-foreground/80">This draft is not visible to students until approved.</span>
          </div>

          <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_280px]">
            <SectionCard title="Generated content" bodyClassName="space-y-4 p-5">
              {state === "loading" ? (
                <div className="space-y-3">
                  {[0, 1, 2, 3, 4].map((i) => (<Skeleton key={i} className="h-4 w-full" />))}
                  <Skeleton className="h-32 w-full" />
                </div>
              ) : (
                <>
                  <h2 className="text-lg font-bold">{lessonContent.title}</h2>
                  <p className="text-sm leading-relaxed text-muted-foreground">{lessonContent.intro}</p>
                  <div>
                    <h3 className="text-sm font-semibold">Learning objectives</h3>
                    <ul className="mt-2 space-y-1.5">
                      {lessonContent.objectives.map((o) => (
                        <li key={o} className="flex gap-2 text-sm text-muted-foreground">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />{o}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <CodeBlock code={sampleCode} filename="Student.cs" />
                  <div className="rounded-xl border-l-4 border-primary bg-primary-soft p-4 text-sm">{lessonContent.callout}</div>
                </>
              )}
            </SectionCard>

            <div className="space-y-4">
              <SectionCard title="Generation metadata" bodyClassName="space-y-3 p-5">
                {[
                  ["Topic", "Encapsulation in C#"],
                  ["Difficulty", "Intermediate"],
                  ["Reading time", "6 minutes"],
                  ["AI model", "GPT-5 · education tuned"],
                  ["Generated", "11 Aug 2026, 08:02"],
                  ["Tokens", "2,418"],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between gap-3 text-sm">
                    <span className="text-muted-foreground">{k}</span>
                    <span className="truncate font-medium">{v}</span>
                  </div>
                ))}
                <div className="flex items-center gap-2 rounded-xl bg-muted/60 p-3 text-xs text-muted-foreground">
                  <Cpu className="h-4 w-4 shrink-0" /> Grounded on the current course outline and lesson objectives.
                </div>
              </SectionCard>
              <SectionCard title="Actions" bodyClassName="space-y-2 p-5">
                <Button variant="outline" className="w-full" onClick={generate}><RefreshCw className="h-4 w-4" /> Regenerate</Button>
                <Button variant="outline" className="w-full" onClick={() => toast("Opening lesson editor")}>Edit content</Button>
                <Button variant="outline" className="w-full" onClick={() => toast.success("Saved as draft")}><Save className="h-4 w-4" /> Save as draft</Button>
                <Button className="w-full" onClick={() => toast.success("Submitted for review")}><Send className="h-4 w-4" /> Submit for review</Button>
                <p className="flex items-center gap-1.5 pt-1 text-xs text-muted-foreground"><Clock className="h-3.5 w-3.5" /> Typical review turnaround: 1 working day</p>
              </SectionCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
