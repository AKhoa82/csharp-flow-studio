import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, Plus, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DifficultyBadge, PageHeader, StatusBadge } from "@/components/primitives";
import { tests } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/tests/")({
  head: () => ({
    meta: [
      { title: "Tests — CSharpHub Studio" },
      { name: "description", content: "Create and manage C# assessments, quizzes and practice sets." },
      { property: "og:title", content: "Tests — CSharpHub Studio" },
      { property: "og:description", content: "Create and manage C# assessments, quizzes and practice sets." },
    ],
  }),
  component: TestsPage,
});

function TestsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Tests"
        description="Assessments built from the C# question bank."
        actions={<Button asChild><Link to="/admin/tests/builder"><Plus className="h-4 w-4" /> Create test</Link></Button>}
      />
      <div className="surface overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Test</TableHead>
              <TableHead className="hidden lg:table-cell">Course</TableHead>
              <TableHead className="text-right">Questions</TableHead>
              <TableHead className="hidden md:table-cell">Duration</TableHead>
              <TableHead>Difficulty</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden xl:table-cell">Attempts</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tests.map((t) => (
              <TableRow key={t.id} className="group">
                <TableCell>
                  <Link to="/admin/tests/preview" className="block">
                    <span className="block font-semibold group-hover:text-primary">{t.title}</span>
                    <span className="block text-xs text-muted-foreground">Created {t.createdAt}</span>
                  </Link>
                </TableCell>
                <TableCell className="hidden text-sm text-muted-foreground lg:table-cell">{t.course}</TableCell>
                <TableCell className="text-right tabular-nums">{t.questions}</TableCell>
                <TableCell className="hidden md:table-cell">
                  <span className="flex items-center gap-1 text-sm text-muted-foreground"><Clock className="h-3.5 w-3.5" />{t.duration} min</span>
                </TableCell>
                <TableCell><DifficultyBadge difficulty={t.difficulty} /></TableCell>
                <TableCell><StatusBadge status={t.status} /></TableCell>
                <TableCell className="hidden xl:table-cell">
                  <span className="flex items-center gap-1 text-sm text-muted-foreground"><Users className="h-3.5 w-3.5" />{t.attempts}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
