import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Check, ImagePlus, Save, Upload } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PageHeader, SectionCard } from "@/components/primitives";
import { categories } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/courses/new")({
  head: () => ({
    meta: [
      { title: "Create course — CSharpHub Studio" },
      { name: "description", content: "Guided workflow to create a C# course: details, chapters, lessons, questions, review and publish." },
      { property: "og:title", content: "Create course — CSharpHub Studio" },
      { property: "og:description", content: "Guided workflow to create a new C# course." },
    ],
  }),
  component: CreateCourse,
});

const steps = ["Course details", "Chapters", "Lessons", "Resources", "Questions", "Review & publish"];

function CreateCourse() {
  const [step, setStep] = useState(0);
  const [title, setTitle] = useState("");
  const slug = title.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  return (
    <div className="space-y-6">
      <Button asChild variant="ghost" size="sm" className="-ml-2 text-muted-foreground">
        <Link to="/admin/courses">
          <ArrowLeft className="h-4 w-4" /> Back to courses
        </Link>
      </Button>

      <PageHeader
        title="Create a new course"
        description="Follow the workflow — nothing is published until it has been reviewed."
        actions={
          <>
            <Button variant="outline" onClick={() => toast("Draft saved")}>
              <Save className="h-4 w-4" /> Save draft
            </Button>
            <Button
              onClick={() =>
                step < steps.length - 1
                  ? setStep(step + 1)
                  : toast.success("Course submitted for review")
              }
            >
              {step < steps.length - 1 ? "Continue" : "Submit for review"}
            </Button>
          </>
        }
      />

      <ol className="surface flex flex-wrap gap-2 p-3">
        {steps.map((s, i) => (
          <li key={s} className="min-w-0 flex-1">
            <button
              onClick={() => setStep(i)}
              className={cn(
                "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-semibold transition-colors",
                i === step
                  ? "bg-primary-soft text-primary"
                  : i < step
                    ? "text-success hover:bg-secondary"
                    : "text-muted-foreground hover:bg-secondary",
              )}
            >
              <span
                className={cn(
                  "grid h-5 w-5 shrink-0 place-items-center rounded-full text-[0.65rem]",
                  i === step ? "bg-primary text-primary-foreground" : i < step ? "bg-success text-success-foreground" : "bg-secondary",
                )}
              >
                {i < step ? <Check className="h-3 w-3" /> : i + 1}
              </span>
              <span className="truncate">{s}</span>
            </button>
          </li>
        ))}
      </ol>

      <div className="grid gap-4 lg:grid-cols-3">
        <SectionCard title="Course information" className="lg:col-span-2" bodyClassName="space-y-5 p-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="title">Course title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Object-Oriented Programming in C#"
              />
              {title.length > 0 && title.length < 6 ? (
                <p className="text-xs font-medium text-destructive">Title should be at least 6 characters.</p>
              ) : null}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="slug">Slug</Label>
              <Input id="slug" value={slug} readOnly className="font-mono text-xs" placeholder="oop-in-csharp" />
            </div>
            <div className="space-y-1.5">
              <Label>Category</Label>
              <Select defaultValue="cat-2">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="desc">Description</Label>
              <Textarea
                id="desc"
                rows={4}
                placeholder="Model real problems with classes and objects: encapsulation, inheritance, polymorphism and interfaces."
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Level</Label>
            <RadioGroup defaultValue="Intermediate" className="grid gap-2 sm:grid-cols-3">
              {["Beginner", "Intermediate", "Advanced"].map((l) => (
                <label
                  key={l}
                  className="flex cursor-pointer items-center gap-2 rounded-xl border border-border p-3 text-sm font-medium transition-colors hover:border-primary/50 has-[button[data-state=checked]]:border-primary has-[button[data-state=checked]]:bg-primary-soft"
                >
                  <RadioGroupItem value={l} /> {l}
                </label>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>Thumbnail</Label>
            <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-muted/40 px-6 py-10 text-center transition-colors hover:border-primary/50">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-primary">
                <ImagePlus className="h-5 w-5" />
              </span>
              <p className="text-sm font-medium">Drop an image or click to upload</p>
              <p className="text-xs text-muted-foreground">PNG or JPG, 1280×720 recommended · max 2 MB</p>
              <Button variant="outline" size="sm" className="mt-2">
                <Upload className="h-4 w-4" /> Choose file
              </Button>
            </div>
          </div>
        </SectionCard>

        <div className="space-y-4">
          <SectionCard title="Publishing" bodyClassName="space-y-4 p-5">
            <div className="space-y-1.5">
              <Label>Status</Label>
              <Select defaultValue="draft">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="review">Submit for review</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <p className="rounded-xl bg-warning-soft p-3 text-xs text-warning-foreground">
              Courses can only be published after every chapter has at least one approved lesson.
            </p>
          </SectionCard>

          <SectionCard title="What happens next" bodyClassName="p-5">
            <ol className="space-y-3 text-sm">
              {["Add chapters to structure the curriculum", "Write or generate lessons with AI", "Attach learning resources", "Link questions from the bank", "Send to review, then publish"].map((s, i) => (
                <li key={s} className="flex gap-3">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-secondary text-[0.65rem] font-bold">
                    {i + 1}
                  </span>
                  <span className="text-muted-foreground">{s}</span>
                </li>
              ))}
            </ol>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
