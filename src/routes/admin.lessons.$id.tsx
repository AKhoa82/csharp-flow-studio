import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Bold, Code2, Eye, Heading2, Image, List, Quote, Rocket, Save, Send, Sparkles, Table2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { CodeBlock, PageHeader, SectionCard, StatusBadge } from "@/components/primitives";
import { chapters, lessonContent, sampleCode } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/lessons/$id")({
  head: () => ({
    meta: [
      { title: "Lesson editor — CSharpHub Studio" },
      { name: "description", content: "Write C# lessons with rich content, syntax-highlighted code samples, exercises and review workflow." },
      { property: "og:title", content: "Lesson editor — CSharpHub Studio" },
      { property: "og:description", content: "Write C# lessons with rich content, syntax-highlighted code samples, exercises and review workflow." },
    ],
  }),
  component: LessonEditor,
});

const tools = [Heading2, Bold, List, Quote, Code2, Table2, Image];

function LessonEditor() {
  const { id } = Route.useParams();
  const all = chapters.flatMap((c) => c.lessons.map((l) => ({ ...l, chapter: c.title, chapterId: c.id })));
  const lesson = all.find((l) => l.id === id) ?? all[0]!;
  const [preview, setPreview] = useState(false);
  const [body, setBody] = useState(lessonContent.intro);

  return (
    <div className="space-y-5">
      <Button asChild variant="ghost" size="sm" className="-ml-2 text-muted-foreground">
        <Link to="/admin/lessons"><ArrowLeft className="h-4 w-4" /> All lessons</Link>
      </Button>
      <PageHeader
        eyebrow={<div className="mb-2 flex items-center gap-2"><StatusBadge status={lesson.status} /><span className="text-xs text-muted-foreground">{lesson.chapter}</span></div>}
        title={lesson.title}
        actions={
          <>
            <Button variant="outline" onClick={() => setPreview((p) => !p)}><Eye className="h-4 w-4" /> {preview ? "Edit" : "Preview"}</Button>
            <Button variant="outline" onClick={() => toast.success("Draft saved")}><Save className="h-4 w-4" /> Save draft</Button>
            <Button variant="outline" onClick={() => toast("Generating with AI…", { description: "The draft will land in the review queue." })}><Sparkles className="h-4 w-4" /> Generate with AI</Button>
            <Button onClick={() => toast.success("Submitted for review")}><Send className="h-4 w-4" /> Submit for review</Button>
          </>
        }
      />

      <div className="grid gap-4 xl:grid-cols-[240px_minmax(0,1fr)_280px]">
        <aside className="surface hidden h-fit p-3 xl:block">
          <p className="px-2 pb-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">Structure</p>
          <ul className="space-y-0.5">
            {all.slice(0, 10).map((l) => (
              <li key={l.id}>
                <Link to="/admin/lessons/$id" params={{ id: l.id }} className={cn("block truncate rounded-lg px-2.5 py-2 text-sm transition-colors", l.id === lesson.id ? "bg-primary-soft font-semibold text-primary" : "text-muted-foreground hover:bg-secondary")}>
                  {l.title}
                </Link>
              </li>
            ))}
          </ul>
        </aside>

        <div className="min-w-0 space-y-4">
          <div className="surface overflow-hidden">
            <div className="flex flex-wrap items-center gap-1 border-b border-border bg-muted/40 px-3 py-2">
              {tools.map((T, i) => (
                <Button key={i} variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                  <T className="h-4 w-4" />
                </Button>
              ))}
              <span className="ml-auto text-xs text-muted-foreground">Markdown supported</span>
            </div>
            {preview ? (
              <article className="space-y-4 p-6">
                <h2 className="text-xl font-bold">{lesson.title}</h2>
                <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
                <div className="rounded-xl border-l-4 border-primary bg-primary-soft p-4 text-sm">{lessonContent.callout}</div>
                <CodeBlock code={sampleCode} filename="Student.cs" />
              </article>
            ) : (
              <Textarea value={body} onChange={(e) => setBody(e.target.value)} rows={10} className="rounded-none border-0 focus-visible:ring-0" />
            )}
          </div>

          <SectionCard title="C# example" description="Rendered with syntax highlighting for students" bodyClassName="p-4">
            <CodeBlock code={sampleCode} filename="Student.cs" />
          </SectionCard>

          <SectionCard title="Exercises" bodyClassName="space-y-3 p-5">
            {["Convert the public fields of BankAccount into validated properties.", "Add a Withdraw method that throws when the balance is insufficient.", "Explain why Credits has a private setter."].map((e, i) => (
              <div key={e} className="flex gap-3 rounded-xl bg-muted/50 p-3 text-sm">
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary text-[0.65rem] font-bold text-primary-foreground">{i + 1}</span>
                {e}
              </div>
            ))}
          </SectionCard>
        </div>

        <aside className="space-y-4">
          <SectionCard title="Lesson settings" bodyClassName="space-y-4 p-5">
            <div className="space-y-1.5"><Label>Title</Label><Input defaultValue={lesson.title} /></div>
            <div className="space-y-1.5"><Label>Slug</Label><Input defaultValue={lesson.slug} className="font-mono text-xs" /></div>
            <div className="space-y-1.5">
              <Label>Chapter</Label>
              <Select defaultValue={lesson.chapterId}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{chapters.map((c) => (<SelectItem key={c.id} value={c.id}>{c.title}</SelectItem>))}</SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Status</Label>
              <Select defaultValue={lesson.status}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="review">In review</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <label className="flex items-center justify-between text-sm">
              Show code playground <Switch defaultChecked />
            </label>
          </SectionCard>
          <SectionCard title="Publishing" bodyClassName="space-y-2 p-5">
            <Button className="w-full" variant="outline" onClick={() => toast.success("Lesson approved")}>Approve</Button>
            <Button className="w-full" onClick={() => toast.success("Lesson published")}><Rocket className="h-4 w-4" /> Publish</Button>
          </SectionCard>
        </aside>
      </div>
    </div>
  );
}
