import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, GripVertical, Plus, Save, Send, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DifficultyBadge, PageHeader, SectionCard } from "@/components/primitives";
import { chapters, courses } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/questions/editor")({
  head: () => ({
    meta: [
      { title: "Question editor — CSharpHub Studio" },
      { name: "description", content: "Create accurate C# questions with options, correct answers and explanations." },
      { property: "og:title", content: "Question editor — CSharpHub Studio" },
      { property: "og:description", content: "Create accurate C# questions with options, correct answers and explanations." },
    ],
  }),
  component: QuestionEditor,
});

const letters = ["A", "B", "C", "D", "E", "F"];

function QuestionEditor() {
  const [type, setType] = useState("Single Choice");
  const [content, setContent] = useState("Which access modifier makes a member visible only inside the declaring class?");
  const [options, setOptions] = useState([
    { id: "1", text: "public", correct: false },
    { id: "2", text: "private", correct: true },
    { id: "3", text: "protected", correct: false },
    { id: "4", text: "internal", correct: false },
  ]);

  const toggle = (id: string) =>
    setOptions((o) =>
      o.map((x) =>
        type === "Multiple Choice"
          ? x.id === id ? { ...x, correct: !x.correct } : x
          : { ...x, correct: x.id === id },
      ),
    );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Question editor"
        description="Accuracy first: every question needs a correct answer and an explanation."
        actions={
          <>
            <Button variant="outline" onClick={() => toast.success("Draft saved")}><Save className="h-4 w-4" /> Save draft</Button>
            <Button onClick={() => toast.success("Sent to review queue")}><Send className="h-4 w-4" /> Submit for review</Button>
          </>
        }
      />

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_380px]">
        <div className="space-y-4">
          <SectionCard title="Placement" bodyClassName="grid gap-4 p-5 sm:grid-cols-3">
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
              <Select defaultValue="access-modifiers">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="access-modifiers">Access Modifiers</SelectItem>
                  <SelectItem value="encapsulation">Encapsulation in Practice</SelectItem>
                  <SelectItem value="interfaces">Interfaces</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </SectionCard>

          <SectionCard title="Question" bodyClassName="space-y-4 p-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label>Question type</Label>
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Single Choice">Single Choice</SelectItem>
                    <SelectItem value="Multiple Choice">Multiple Choice</SelectItem>
                    <SelectItem value="True / False">True / False</SelectItem>
                    <SelectItem value="Fill in the Blank">Fill in the Blank</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Difficulty</Label>
                <Select defaultValue="Easy">
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Easy">Easy</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Question content</Label>
              <Textarea rows={3} value={content} onChange={(e) => setContent(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Explanation</Label>
              <Textarea rows={3} defaultValue="private restricts access to the declaring type. protected also allows derived types, internal allows the same assembly." />
            </div>
          </SectionCard>

          {type === "Fill in the Blank" ? (
            <SectionCard title="Accepted answers" bodyClassName="space-y-3 p-5">
              <Input defaultValue="sealed" className="font-mono" />
              <Input placeholder="Accepted alternative, e.g. sealed override" className="font-mono" />
            </SectionCard>
          ) : (
            <SectionCard
              title="Answer options"
              description={type === "Multiple Choice" ? "Mark every correct option" : "Mark exactly one correct option"}
              bodyClassName="space-y-2 p-5"
              action={
                <Button size="sm" variant="ghost" onClick={() => setOptions((o) => [...o, { id: String(Date.now()), text: "", correct: false }])}>
                  <Plus className="h-4 w-4" /> Add option
                </Button>
              }
            >
              {(type === "True / False" ? options.slice(0, 2) : options).map((o, i) => (
                <div key={o.id} className={cn("flex items-center gap-2 rounded-xl border p-2 transition-colors", o.correct ? "border-success/40 bg-success-soft" : "border-border")}>
                  <GripVertical className="h-4 w-4 shrink-0 cursor-grab text-muted-foreground" />
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-background text-xs font-bold">{letters[i]}</span>
                  <Input value={type === "True / False" ? (i === 0 ? "True" : "False") : o.text} onChange={(e) => setOptions((s) => s.map((x) => (x.id === o.id ? { ...x, text: e.target.value } : x)))} className="border-0 bg-transparent shadow-none focus-visible:ring-0" />
                  <Button size="sm" variant={o.correct ? "default" : "outline"} onClick={() => toggle(o.id)} className="shrink-0">
                    <Check className="h-4 w-4" /> {o.correct ? "Correct" : "Mark"}
                  </Button>
                  <Button size="icon" variant="ghost" className="h-8 w-8 shrink-0 text-muted-foreground hover:text-destructive" onClick={() => setOptions((s) => s.filter((x) => x.id !== o.id))}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </SectionCard>
          )}
        </div>

        <SectionCard title="Live preview" description="Exactly what the student will see" bodyClassName="p-5">
          <div className="rounded-xl border border-border p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground">Question 1 of 15</span>
              <DifficultyBadge difficulty="Easy" />
            </div>
            <p className="mt-3 text-sm font-semibold leading-relaxed">{content}</p>
            <div className="mt-4 space-y-2">
              {(type === "True / False" ? [{ id: "t", text: "True", correct: false }, { id: "f", text: "False", correct: true }] : options).map((o, i) => (
                <div key={o.id} className={cn("flex items-center gap-3 rounded-xl border p-3 text-sm transition-colors", o.correct ? "border-success/40 bg-success-soft" : "border-border hover:border-primary/40")}>
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-current text-[0.65rem] font-bold">{letters[i]}</span>
                  {o.text || "Option text"}
                </div>
              ))}
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
