import { cn } from "@/lib/utils";
import type { Difficulty, Level, Status } from "@/lib/mock-data";
import { Sparkles, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const statusStyles: Record<Status, { label: string; cls: string }> = {
  draft: { label: "Draft", cls: "bg-secondary text-secondary-foreground border-border" },
  review: { label: "In review", cls: "bg-warning-soft text-warning-foreground border-warning/30" },
  approved: { label: "Approved", cls: "bg-info-soft text-info border-info/25" },
  published: { label: "Published", cls: "bg-success-soft text-success border-success/25" },
  rejected: { label: "Rejected", cls: "bg-danger-soft text-destructive border-destructive/25" },
};

export function StatusBadge({ status, className }: { status: Status; className?: string }) {
  const s = statusStyles[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold",
        s.cls,
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      {s.label}
    </span>
  );
}

const difficultyStyles: Record<Difficulty, string> = {
  Easy: "bg-success-soft text-success border-success/25",
  Medium: "bg-warning-soft text-warning-foreground border-warning/30",
  Hard: "bg-danger-soft text-destructive border-destructive/25",
};

export function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-semibold",
        difficultyStyles[difficulty],
      )}
    >
      {difficulty}
    </span>
  );
}

const levelStyles: Record<Level, string> = {
  Beginner: "bg-primary-soft text-primary border-primary/25",
  Intermediate: "bg-info-soft text-info border-info/25",
  Advanced: "bg-brand-soft text-brand border-brand/25",
};

export function LevelBadge({ level }: { level: Level }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-semibold",
        levelStyles[level],
      )}
    >
      {level}
    </span>
  );
}

export function AIBadge({ label = "AI generated" }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-md border border-brand/25 bg-brand-soft px-2 py-0.5 text-xs font-semibold text-brand">
      <Sparkles className="h-3 w-3" />
      {label}
    </span>
  );
}

export function PageHeader({
  title,
  description,
  actions,
  eyebrow,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
  eyebrow?: ReactNode;
}) {
  return (
    <header className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 sm:flex sm:flex-wrap sm:items-end sm:justify-between">
      <div className="min-w-0">
        {eyebrow}
        <h1 className="truncate text-2xl font-bold tracking-tight sm:text-[1.75rem]">{title}</h1>
        {description ? (
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {actions ? <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div> : null}
    </header>
  );
}

export function StatCard({
  label,
  value,
  delta,
  icon: Icon,
  tone = "primary",
}: {
  label: string;
  value: string;
  delta?: string;
  icon: LucideIcon;
  tone?: "primary" | "brand" | "success" | "warning" | "info";
}) {
  const tones: Record<string, string> = {
    primary: "bg-primary-soft text-primary",
    brand: "bg-brand-soft text-brand",
    success: "bg-success-soft text-success",
    warning: "bg-warning-soft text-warning-foreground",
    info: "bg-info-soft text-info",
  };
  return (
    <div className="surface group p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-pop">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <span className={cn("grid h-9 w-9 shrink-0 place-items-center rounded-xl", tones[tone])}>
          <Icon className="h-4.5 w-4.5" />
        </span>
      </div>
      <p className="mt-3 text-3xl font-bold tracking-tight tabular-nums">{value}</p>
      {delta ? <p className="mt-1 text-xs font-medium text-success">{delta}</p> : null}
    </div>
  );
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="surface flex flex-col items-center justify-center px-6 py-16 text-center">
      <div className="grid h-14 w-14 place-items-center rounded-2xl bg-primary-soft text-primary">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mt-4 text-base font-semibold">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">{description}</p>
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}

export function LoadingSkeleton({ rows = 4 }: { rows?: number }) {
  return (
    <div className="surface space-y-3 p-5">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4">
          <Skeleton className="h-10 w-10 rounded-xl" />
          <Skeleton className="h-4 flex-1" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
      ))}
    </div>
  );
}

const keywords =
  /\b(public|private|protected|internal|class|static|void|string|int|bool|double|new|return|if|else|for|foreach|while|throw|try|catch|finally|using|namespace|var|get|set|override|virtual|abstract|interface|sealed|async|await|Task|this|null|true|false)\b/g;

export function CodeBlock({
  code,
  filename = "Program.cs",
  className,
}: {
  code: string;
  filename?: string;
  className?: string;
}) {
  const html = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/(\/\/[^\n]*)/g, '<span style="color:oklch(0.68 0.03 200)">$1</span>')
    .replace(/("(?:[^"\\]|\\.)*")/g, '<span style="color:oklch(0.8 0.13 90)">$1</span>')
    .replace(keywords, '<span style="color:oklch(0.78 0.13 285)">$1</span>');

  return (
    <div className={cn("code-surface overflow-hidden", className)}>
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-warning/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-success/70" />
        <span className="ml-2 text-xs opacity-70">{filename}</span>
      </div>
      <pre className="scrollbar-slim overflow-x-auto p-4 text-[13px] leading-relaxed">
        <code dangerouslySetInnerHTML={{ __html: html }} />
      </pre>
    </div>
  );
}

export function SectionCard({
  title,
  description,
  action,
  children,
  className,
  bodyClassName,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <section className={cn("surface flex flex-col", className)}>
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border px-5 py-4">
        <div className="min-w-0">
          <h2 className="truncate text-sm font-semibold">{title}</h2>
          {description ? (
            <p className="truncate text-xs text-muted-foreground">{description}</p>
          ) : null}
        </div>
        {action}
      </div>
      <div className={cn("p-5", bodyClassName)}>{children}</div>
    </section>
  );
}
