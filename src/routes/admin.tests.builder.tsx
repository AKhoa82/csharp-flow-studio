import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Eye, GripVertical, Minus, Plus, Save, Search } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DifficultyBadge, PageHeader, SectionCard } from "@/components/primitives";
import { courses, questions } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/tests/builder")({
  head: () => ({
    meta: [
      { title: "Test builder — CSharpHub Studio" },
      { name: "description", content: "Assemble C# tests by picking questions from the bank and tuning the settings." },
      { property: "og:title", content: "Test builder — CSharpHub Studio" },
      { property: "og:description", content: "Assemble C# tests by picking questions from the bank and tuning the settings." },
    ],
  }),
  component: TestBuilder,
});

function TestBuilder() {
  const [picked, setPicked] = useState<string[]>(["q-1", "q-3"]);
  const [q, setQ] = useState("");
  const bank = questions.filter((x) => x.content.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Test builder"
        description="Drag questions from the bank into your test, then tune the rules."
        actions={
          <>
            <Button asChild variant="outline"><Link to="/admin/tests/preview"><Eye className="h-4 w-4" /> Preview test</Link></Button>
            <Button onClick={() => toast.success("Test saved", { description: `${picked.length} questions` })}><Save className="h-4 w-4" /> Save test</Button>
          </>
        }
      />

      <div className="grid gap-4 xl:grid-cols-[320px_minmax(0,1fr)_300px]">
        <SectionCard title="Question bank" description={`${bank.length} available`} bodyClassName="space-y-2 p-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search…" className="pl-9" />
          </div>
          {bank.map((x) => (
            <div key={x.id} className="rounded-xl border border-border p-3">
              <p className="line-clamp-2 text-sm">{x.content}</p>
              <div className="mt-2 flex items-center gap-2">
                <DifficultyBadge difficulty={x.difficulty} />
                <Button
                  size="sm"
                  variant="ghost"
                  className="ml-auto h-7"
                  onClick={() => setPicked((p) => (p.includes(x.id) ? p : [...p, x.id]))}
                >
                  <Plus className="h-3.5 w-3.5" /> Add
                </Button>
              </div>
            </div>
          ))}
        </SectionCard>

        <SectionCard title="Selected questions" description={`${picked.length} in this test`} bodyClassName="space-y-2 p-3">
          {picked.length === 0 ? (
            <p className="p-8 text-center text-sm text-muted-foreground">Add questions from the bank on the left.</p>
          ) : (
            picked.map((id, i) => {
              const x = questions.find((y) => y.id === id)!;
              return (
                <div key={id} className="flex items-start gap-3 rounded-xl border border-border p-3">
                  <GripVertical className="mt-0.5 h-4 w-4 shrink-0 cursor-grab text-muted-foreground" />
                  <span className="mt-0.5 font-mono text-xs text-muted-foreground">{i + 1}</span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">{x.content}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{x.type} · {x.lesson}</p>
                  </div>
                  <Button size="icon" variant="ghost" className="h-8 w-8 shrink-0" onClick={() => setPicked((p) => p.filter((y) => y !== id))}>
                    <Minus className="h-4 w-4" />
                  </Button>
                </div>
              );
            })
          )}
        </SectionCard>

        <SectionCard title="Test settings" bodyClassName="space-y-4 p-5">
          <div className="space-y-1.5"><Label>Test title</Label><Input defaultValue="OOP Pillars Checkpoint" /></div>
          <div className="space-y-1.5"><Label>Description</Label><Textarea rows={2} defaultValue="Checkpoint covering encapsulation, inheritance and polymorphism." /></div>
          <div className="space-y-1.5">
            <Label>Course</Label>
            <Select defaultValue={courses[1]!.id}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>{courses.map((c) => (<SelectItem key={c.id} value={c.id}>{c.title}</SelectItem>))}</SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5"><Label>Time limit (min)</Label><Input type="number" defaultValue={35} /></div>
            <div className="space-y-1.5"><Label>Passing score (%)</Label><Input type="number" defaultValue={70} /></div>
          </div>
          <label className="flex items-center justify-between text-sm">Randomise questions <Switch defaultChecked /></label>
          <label className="flex items-center justify-between text-sm">Randomise answers <Switch /></label>
          <label className="flex items-center justify-between text-sm">Show explanations after submit <Switch defaultChecked /></label>
        </SectionCard>
      </div>
    </div>
  );
}
