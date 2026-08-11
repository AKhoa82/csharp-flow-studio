import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/primitives";
import { Curriculum } from "@/components/curriculum";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { chaptersOf, courses } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/chapters")({
  head: () => ({
    meta: [
      { title: "Chapters — CSharpHub Studio" },
      { name: "description", content: "Structure each C# course into chapters and reorder lessons with drag and drop." },
      { property: "og:title", content: "Chapters — CSharpHub Studio" },
      { property: "og:description", content: "Structure each C# course into chapters and reorder lessons with drag and drop." },
    ],
  }),
  component: ChaptersPage,
});

function ChaptersPage() {
  const [courseId, setCourseId] = useState(courses[0]!.id);
  const data = chaptersOf(courseId);
  return (
    <div className="space-y-6">
      <PageHeader
        title="Chapter management"
        description="Drag chapters to reorder the curriculum. Expand a chapter to manage its lessons."
        actions={
          <Select value={courseId} onValueChange={setCourseId}>
            <SelectTrigger className="w-[260px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              {courses.map((c) => (
                <SelectItem key={c.id} value={c.id}>{c.title}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        }
      />
      {data.length ? <Curriculum key={courseId} data={data} /> : (
        <p className="surface p-10 text-center text-sm text-muted-foreground">
          This course has no chapters yet.
        </p>
      )}
    </div>
  );
}
