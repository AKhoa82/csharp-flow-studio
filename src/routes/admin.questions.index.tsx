import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { FileQuestion, Plus, Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AIBadge, DifficultyBadge, EmptyState, PageHeader, StatusBadge } from "@/components/primitives";
import { courses, questions } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/questions/")({
  head: () => ({
    meta: [
      { title: "Question bank — CSharpHub Studio" },
      { name: "description", content: "Search and filter the C# question bank by course, chapter, difficulty, type and AI provenance." },
      { property: "og:title", content: "Question bank — CSharpHub Studio" },
      { property: "og:description", content: "Search and filter the C# question bank by course, chapter, difficulty, type and AI provenance." },
    ],
  }),
  component: QuestionBank,
});

function QuestionBank() {
  const [q, setQ] = useState("");
  const [course, setCourse] = useState("all");
  const [difficulty, setDifficulty] = useState("all");
  const [ai, setAi] = useState("all");

  const rows = questions
    .filter((x) => x.content.toLowerCase().includes(q.toLowerCase()))
    .filter((x) => course === "all" || x.courseId === course)
    .filter((x) => difficulty === "all" || x.difficulty === difficulty)
    .filter((x) => ai === "all" || String(x.aiGenerated) === ai);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Question bank"
        description="965 questions covering C# syntax, OOP pillars, collections, LINQ and exceptions."
        actions={
          <>
            <Button asChild variant="outline"><Link to="/admin/ai/questions"><Sparkles className="h-4 w-4" /> Generate with AI</Link></Button>
            <Button asChild><Link to="/admin/questions/editor"><Plus className="h-4 w-4" /> Create question</Link></Button>
          </>
        }
      />
      <div className="surface flex flex-wrap items-center gap-3 p-4">
        <div className="relative min-w-0 flex-1 sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search questions…" className="pl-9" />
        </div>
        <Select value={course} onValueChange={setCourse}>
          <SelectTrigger className="w-[220px]"><SelectValue placeholder="Course" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All courses</SelectItem>
            {courses.map((c) => (<SelectItem key={c.id} value={c.id}>{c.title}</SelectItem>))}
          </SelectContent>
        </Select>
        <Select value={difficulty} onValueChange={setDifficulty}>
          <SelectTrigger className="w-[150px]"><SelectValue placeholder="Difficulty" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any difficulty</SelectItem>
            <SelectItem value="Easy">Easy</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="Hard">Hard</SelectItem>
          </SelectContent>
        </Select>
        <Select value={ai} onValueChange={setAi}>
          <SelectTrigger className="w-[160px]"><SelectValue placeholder="Source" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any source</SelectItem>
            <SelectItem value="true">AI generated</SelectItem>
            <SelectItem value="false">Human written</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {rows.length === 0 ? (
        <EmptyState icon={FileQuestion} title="No questions match" description="Loosen the filters or generate a fresh set with AI." action={<Button asChild><Link to="/admin/ai/questions">Generate with AI</Link></Button>} />
      ) : (
        <div className="surface overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Question</TableHead>
                <TableHead className="hidden lg:table-cell">Type</TableHead>
                <TableHead className="hidden xl:table-cell">Lesson</TableHead>
                <TableHead>Difficulty</TableHead>
                <TableHead className="hidden md:table-cell">Source</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((x) => (
                <TableRow key={x.id} className="group">
                  <TableCell className="max-w-md">
                    <Link to="/admin/questions/editor" className="block">
                      <span className="line-clamp-1 text-sm font-medium group-hover:text-primary">{x.content}</span>
                      <span className="text-xs text-muted-foreground">{x.chapter}</span>
                    </Link>
                  </TableCell>
                  <TableCell className="hidden text-sm text-muted-foreground lg:table-cell">{x.type}</TableCell>
                  <TableCell className="hidden text-sm text-muted-foreground xl:table-cell">{x.lesson}</TableCell>
                  <TableCell><DifficultyBadge difficulty={x.difficulty} /></TableCell>
                  <TableCell className="hidden md:table-cell">{x.aiGenerated ? <AIBadge label="AI" /> : <span className="text-xs text-muted-foreground">Human</span>}</TableCell>
                  <TableCell><StatusBadge status={x.status} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
