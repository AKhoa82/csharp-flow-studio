import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Clock, Flame, Target, TrendingUp } from "lucide-react";
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
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PageHeader, SectionCard, StatCard } from "@/components/primitives";
import { weakTopics } from "@/lib/mock-data";

export const Route = createFileRoute("/learn/analytics")({
  head: () => ({
    meta: [
      { title: "Practice analytics — CSharpHub" },
      {
        name: "description",
        content:
          "See your weekly C# study time, question accuracy trends, difficulty breakdown and weakest topics in one dashboard.",
      },
      { property: "og:title", content: "Practice analytics — CSharpHub" },
      {
        property: "og:description",
        content: "Weekly study time and accuracy trends for your C# practice sessions.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PracticeAnalytics,
});

const weekly = {
  "4w": [
    { label: "Jul 13", minutes: 168, accuracy: 64, questions: 92 },
    { label: "Jul 20", minutes: 205, accuracy: 69, questions: 118 },
    { label: "Jul 27", minutes: 152, accuracy: 72, questions: 86 },
    { label: "Aug 3", minutes: 241, accuracy: 76, questions: 143 },
  ],
  "12w": [
    { label: "May 25", minutes: 96, accuracy: 51, questions: 48 },
    { label: "Jun 1", minutes: 122, accuracy: 55, questions: 61 },
    { label: "Jun 8", minutes: 88, accuracy: 58, questions: 44 },
    { label: "Jun 15", minutes: 143, accuracy: 57, questions: 72 },
    { label: "Jun 22", minutes: 176, accuracy: 62, questions: 95 },
    { label: "Jun 29", minutes: 131, accuracy: 60, questions: 70 },
    { label: "Jul 6", minutes: 158, accuracy: 66, questions: 88 },
    { label: "Jul 13", minutes: 168, accuracy: 64, questions: 92 },
    { label: "Jul 20", minutes: 205, accuracy: 69, questions: 118 },
    { label: "Jul 27", minutes: 152, accuracy: 72, questions: 86 },
    { label: "Aug 3", minutes: 241, accuracy: 76, questions: 143 },
    { label: "Aug 10", minutes: 262, accuracy: 79, questions: 156 },
  ],
};

const perDay = [
  { day: "Mon", minutes: 42, accuracy: 74 },
  { day: "Tue", minutes: 28, accuracy: 68 },
  { day: "Wed", minutes: 55, accuracy: 81 },
  { day: "Thu", minutes: 18, accuracy: 62 },
  { day: "Fri", minutes: 47, accuracy: 77 },
  { day: "Sat", minutes: 63, accuracy: 84 },
  { day: "Sun", minutes: 31, accuracy: 71 },
];

const byDifficulty = [
  { difficulty: "Easy", accuracy: 91, fill: "var(--color-chart-5)" },
  { difficulty: "Medium", accuracy: 74, fill: "var(--color-chart-1)" },
  { difficulty: "Hard", accuracy: 52, fill: "var(--color-chart-3)" },
];

const axis = {
  stroke: "var(--color-muted-foreground)",
  fontSize: 11,
  tickLine: false,
  axisLine: false,
};

const tooltipStyle = {
  contentStyle: {
    background: "var(--color-popover)",
    border: "1px solid var(--color-border)",
    borderRadius: "0.75rem",
    fontSize: "12px",
    color: "var(--color-popover-foreground)",
  },
  labelStyle: { color: "var(--color-muted-foreground)", marginBottom: 4 },
};

function PracticeAnalytics() {
  const [range, setRange] = useState<"4w" | "12w">("12w");
  const data = weekly[range];
  const last = data[data.length - 1]!;
  const prev = data[data.length - 2] ?? last;
  const totalMinutes = data.reduce((s, d) => s + d.minutes, 0);
  const totalQuestions = data.reduce((s, d) => s + d.questions, 0);
  const avgAccuracy = Math.round(data.reduce((s, d) => s + d.accuracy, 0) / data.length);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Learn"
        title="Practice analytics"
        description="How much you studied, how accurate you were, and what to work on next."
        actions={
          <div className="flex items-center gap-2">
            <div className="inline-flex rounded-xl border border-border p-0.5">
              {(["4w", "12w"] as const).map((r) => (
                <Button
                  key={r}
                  size="sm"
                  variant={range === r ? "secondary" : "ghost"}
                  className="h-8 px-3 text-xs"
                  onClick={() => setRange(r)}
                >
                  {r === "4w" ? "4 weeks" : "12 weeks"}
                </Button>
              ))}
            </div>
            <Button asChild size="sm">
              <Link to="/learn/practice">Start practice</Link>
            </Button>
          </div>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Study time this week"
          value={`${Math.floor(last.minutes / 60)}h ${last.minutes % 60}m`}
          delta={`${last.minutes - prev.minutes >= 0 ? "+" : ""}${last.minutes - prev.minutes} min vs last week`}
          icon={Clock}
        />
        <StatCard
          label="Accuracy this week"
          value={`${last.accuracy}%`}
          delta={`${last.accuracy - prev.accuracy >= 0 ? "+" : ""}${last.accuracy - prev.accuracy} pts vs last week`}
          icon={Target}
          tone="success"
        />
        <StatCard
          label="Questions answered"
          value={totalQuestions.toLocaleString()}
          delta={`${range === "4w" ? "last 4" : "last 12"} weeks`}
          icon={TrendingUp}
          tone="brand"
        />
        <StatCard
          label="Total study time"
          value={`${Math.round(totalMinutes / 60)}h`}
          delta={`avg ${avgAccuracy}% accuracy`}
          icon={Flame}
          tone="warning"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <SectionCard
          title="Weekly study time"
          description="Minutes spent in lessons and practice sessions"
          bodyClassName="pt-2"
        >
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={data} margin={{ left: -18, right: 8, top: 8 }}>
              <defs>
                <linearGradient id="studyTime" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.45} />
                  <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="label" {...axis} interval="preserveStartEnd" />
              <YAxis {...axis} width={44} unit="m" />
              <Tooltip {...tooltipStyle} formatter={(v) => [`${v} min`, "Study time"]} />
              <Area
                type="monotone"
                dataKey="minutes"
                stroke="var(--color-primary)"
                strokeWidth={2}
                fill="url(#studyTime)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </SectionCard>

        <SectionCard
          title="Accuracy trend"
          description="Share of questions answered correctly each week"
          bodyClassName="pt-2"
        >
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={data} margin={{ left: -18, right: 8, top: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="label" {...axis} interval="preserveStartEnd" />
              <YAxis {...axis} width={44} domain={[40, 100]} unit="%" />
              <Tooltip {...tooltipStyle} formatter={(v) => [`${v}%`, "Accuracy"]} />
              <Line
                type="monotone"
                dataKey="accuracy"
                stroke="var(--color-brand)"
                strokeWidth={2.5}
                dot={{ r: 3, strokeWidth: 0, fill: "var(--color-brand)" }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </SectionCard>

        <SectionCard
          title="This week by day"
          description="Minutes studied and accuracy per day"
          bodyClassName="pt-2"
        >
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={perDay} margin={{ left: -18, right: 8, top: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="day" {...axis} />
              <YAxis {...axis} width={44} />
              <Tooltip {...tooltipStyle} cursor={{ fill: "var(--color-secondary)" }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar
                name="Minutes"
                dataKey="minutes"
                fill="var(--color-chart-1)"
                radius={[6, 6, 0, 0]}
                maxBarSize={26}
              />
              <Bar
                name="Accuracy %"
                dataKey="accuracy"
                fill="var(--color-chart-2)"
                radius={[6, 6, 0, 0]}
                maxBarSize={26}
              />
            </BarChart>
          </ResponsiveContainer>
        </SectionCard>

        <SectionCard
          title="Accuracy by difficulty"
          description="Where questions start to get you"
          bodyClassName="pt-2"
        >
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={byDifficulty} layout="vertical" margin={{ left: 8, right: 16, top: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" horizontal={false} />
              <XAxis type="number" domain={[0, 100]} unit="%" {...axis} />
              <YAxis type="category" dataKey="difficulty" width={72} {...axis} />
              <Tooltip {...tooltipStyle} formatter={(v) => [`${v}%`, "Accuracy"]} cursor={{ fill: "var(--color-secondary)" }} />
              <Bar dataKey="accuracy" radius={[0, 6, 6, 0]} maxBarSize={28}>
                {byDifficulty.map((d) => (
                  <Cell key={d.difficulty} fill={d.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </SectionCard>
      </div>

      <SectionCard
        title="Weakest topics"
        description="Lowest accuracy across your recent sessions"
        action={
          <Button asChild size="sm" variant="outline">
            <Link to="/learn/practice">Drill these</Link>
          </Button>
        }
      >
        <ul className="space-y-4">
          {weakTopics.map((t) => (
            <li key={t.topic} className="space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{t.topic}</span>
                <span className="tabular-nums text-muted-foreground">{t.accuracy}%</span>
              </div>
              <Progress value={t.accuracy} className="h-2" />
            </li>
          ))}
        </ul>
      </SectionCard>
    </div>
  );
}
