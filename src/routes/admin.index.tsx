import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  BookOpen,
  Bot,
  CheckCircle2,
  FileQuestion,
  FileText,
  PenLine,
  Plus,
  Rocket,
  Sparkles,
  Wand2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader, SectionCard, StatCard } from "@/components/primitives";
import {
  activity,
  aiVsManual,
  contentGrowth,
  coursesByLevel,
  pendingReview,
  questionsByDifficulty,
  statusDistribution,
} from "@/lib/mock-data";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title: "Content Dashboard — CSharpHub Studio" },
      { name: "description", content: "Overview of C# course production: content growth, question bank health and AI review queue." },
      { property: "og:title", content: "Content Dashboard — CSharpHub Studio" },
      { property: "og:description", content: "Overview of C# course production, question bank health and the AI review queue." },
    ],
  }),
  component: Dashboard,
});

const tooltipStyle = {
  borderRadius: 12,
  border: "1px solid var(--color-border)",
  background: "var(--color-popover)",
  fontSize: 12,
  boxShadow: "var(--shadow-pop)",
};

const activityIcon = {
  publish: Rocket,
  ai: Sparkles,
  approve: CheckCircle2,
  edit: PenLine,
  create: Plus,
};

function Dashboard() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Content Dashboard"
        description="Everything your team is building for the C# & OOP curriculum, at a glance."
        actions={
          <>
            <Button asChild variant="outline">
              <Link to="/admin/ai/content">
                <Wand2 className="h-4 w-4" /> Generate with AI
              </Link>
            </Button>
            <Button asChild>
              <Link to="/admin/courses/new">
                <Plus className="h-4 w-4" /> New course
              </Link>
            </Button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
        <StatCard label="Total courses" value="24" delta="+3 this month" icon={BookOpen} tone="primary" />
        <StatCard label="Total lessons" value="126" delta="+18 this month" icon={FileText} tone="info" />
        <StatCard label="Total questions" value="965" delta="+153 this month" icon={FileQuestion} tone="brand" />
        <StatCard label="Published" value="62" delta="+7 this month" icon={Rocket} tone="success" />
        <StatCard label="Drafts" value="26" icon={PenLine} tone="warning" />
        <StatCard label="AI generated" value="268" delta="27.8% of bank" icon={Sparkles} tone="brand" />
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <SectionCard
          title="Content growth"
          description="Lessons and questions produced per month"
          className="xl:col-span-2"
          bodyClassName="h-[280px] p-4"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={contentGrowth} margin={{ left: -18, right: 8, top: 8 }}>
              <defs>
                <linearGradient id="gLessons" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.45} />
                  <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gQuestions" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-chart-2)" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="var(--color-chart-2)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} stroke="var(--color-muted-foreground)" />
              <YAxis tickLine={false} axisLine={false} fontSize={12} stroke="var(--color-muted-foreground)" />
              <Tooltip contentStyle={tooltipStyle} />
              <Area type="monotone" dataKey="questions" stroke="var(--color-chart-2)" fill="url(#gQuestions)" strokeWidth={2} />
              <Area type="monotone" dataKey="lessons" stroke="var(--color-chart-1)" fill="url(#gLessons)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </SectionCard>

        <SectionCard title="Content status" description="Distribution across the workflow" bodyClassName="h-[280px] p-4">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={statusDistribution} dataKey="value" nameKey="name" innerRadius={52} outerRadius={80} paddingAngle={3} strokeWidth={0}>
                {statusDistribution.map((d) => (
                  <Cell key={d.name} fill={d.fill} />
                ))}
              </Pie>
              <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
        </SectionCard>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <SectionCard title="Questions by difficulty" bodyClassName="h-[240px] p-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={questionsByDifficulty} margin={{ left: -22, right: 8, top: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="difficulty" tickLine={false} axisLine={false} fontSize={12} stroke="var(--color-muted-foreground)" />
              <YAxis tickLine={false} axisLine={false} fontSize={12} stroke="var(--color-muted-foreground)" />
              <Tooltip cursor={{ fill: "var(--color-muted)" }} contentStyle={tooltipStyle} />
              <Bar dataKey="count" radius={[8, 8, 0, 0]} fill="var(--color-chart-1)" barSize={44} />
            </BarChart>
          </ResponsiveContainer>
        </SectionCard>

        <SectionCard title="Courses by level" bodyClassName="h-[240px] p-4">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={coursesByLevel} dataKey="value" nameKey="name" outerRadius={78} strokeWidth={0}>
                {coursesByLevel.map((d) => (
                  <Cell key={d.name} fill={d.fill} />
                ))}
              </Pie>
              <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
        </SectionCard>

        <SectionCard title="AI vs manual content" description="Items created per month" bodyClassName="h-[240px] p-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={aiVsManual} margin={{ left: -22, right: 8, top: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} stroke="var(--color-muted-foreground)" />
              <YAxis tickLine={false} axisLine={false} fontSize={12} stroke="var(--color-muted-foreground)" />
              <Tooltip contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey="ai" stroke="var(--color-chart-2)" strokeWidth={2.5} dot={false} />
              <Line type="monotone" dataKey="manual" stroke="var(--color-chart-1)" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </SectionCard>
      </div>

      <div className="grid gap-4 lg:grid-cols-5">
        <SectionCard
          title="Recent activity"
          description="Latest changes across the curriculum"
          className="lg:col-span-3"
          bodyClassName="p-0"
        >
          <ul className="divide-y divide-border">
            {activity.map((a) => {
              const Icon = activityIcon[a.kind];
              return (
                <li key={a.id} className="flex items-center gap-3 px-5 py-3.5 transition-colors hover:bg-muted/50">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-secondary text-muted-foreground">
                    <Icon className="h-4 w-4" />
                  </span>
                  <p className="min-w-0 flex-1 truncate text-sm">
                    <span className="font-semibold">{a.who}</span>{" "}
                    <span className="text-muted-foreground">{a.action}</span>{" "}
                    <span className="font-medium">{a.target}</span>
                  </p>
                  <span className="shrink-0 text-xs text-muted-foreground">{a.time}</span>
                </li>
              );
            })}
          </ul>
        </SectionCard>

        <SectionCard
          title="Pending review"
          description="AI output waiting for a human decision"
          className="lg:col-span-2"
          bodyClassName="p-0"
          action={
            <Button asChild size="sm" variant="ghost">
              <Link to="/admin/review">Open queue</Link>
            </Button>
          }
        >
          <ul className="divide-y divide-border">
            {pendingReview.map((p) => (
              <li key={p.id} className="px-5 py-3.5">
                <div className="flex items-start gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand">
                    <Bot className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{p.title}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {p.kind} · {p.course} · {p.by} · {p.time}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>
    </div>
  );
}
