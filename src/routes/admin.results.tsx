import { createFileRoute } from "@tanstack/react-router";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Award, Target, TrendingUp, Users } from "lucide-react";
import { PageHeader, SectionCard, StatCard } from "@/components/primitives";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { tests, weakTopics } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/results")({
  head: () => ({
    meta: [
      { title: "Results — CSharpHub Studio" },
      { name: "description", content: "Attempt volume, average scores and the C# topics students struggle with most." },
      { property: "og:title", content: "Results — CSharpHub Studio" },
      { property: "og:description", content: "Attempt volume, average scores and the C# topics students struggle with most." },
    ],
  }),
  component: ResultsPage,
});

function ResultsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Results & analytics" description="How students are performing across the C# curriculum." />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total attempts" value="1,499" delta="+184 this month" icon={Users} tone="primary" />
        <StatCard label="Average score" value="77%" delta="+3 pts" icon={TrendingUp} tone="success" />
        <StatCard label="Pass rate" value="82%" icon={Award} tone="info" />
        <StatCard label="Weakest topic" value="Polymorphism" icon={Target} tone="warning" />
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <SectionCard title="Average score by test" bodyClassName="h-[280px] p-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={tests.map((t) => ({ name: t.title.split(" ")[0], score: t.avgScore }))} margin={{ left: -22 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="name" tickLine={false} axisLine={false} fontSize={12} stroke="var(--color-muted-foreground)" />
              <YAxis tickLine={false} axisLine={false} fontSize={12} stroke="var(--color-muted-foreground)" />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--color-border)", background: "var(--color-popover)", fontSize: 12 }} />
              <Bar dataKey="score" radius={[8, 8, 0, 0]} fill="var(--color-chart-1)" />
            </BarChart>
          </ResponsiveContainer>
        </SectionCard>
        <SectionCard title="Topics students struggle with" bodyClassName="space-y-4 p-5">
          {weakTopics.map((w) => (
            <div key={w.topic}>
              <div className="flex items-center justify-between text-sm"><span className="font-medium">{w.topic}</span><span className="tabular-nums text-muted-foreground">{w.accuracy}%</span></div>
              <Progress value={w.accuracy} className="mt-1.5 h-2" />
            </div>
          ))}
        </SectionCard>
      </div>
      <SectionCard title="Recent attempts" bodyClassName="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Test</TableHead><TableHead>Course</TableHead>
                <TableHead className="text-right">Attempts</TableHead><TableHead className="text-right">Avg score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tests.map((t) => (
                <TableRow key={t.id}>
                  <TableCell className="font-medium">{t.title}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{t.course}</TableCell>
                  <TableCell className="text-right tabular-nums">{t.attempts}</TableCell>
                  <TableCell className="text-right tabular-nums">{t.avgScore}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </SectionCard>
    </div>
  );
}
