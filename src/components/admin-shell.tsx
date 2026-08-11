import { Link, useRouterState } from "@tanstack/react-router";
import {
  Bell,
  BookOpen,
  Bot,
  Boxes,
  ChevronsLeft,
  ClipboardCheck,
  FileQuestion,
  FileText,
  FlaskConical,
  Gauge,
  GraduationCap,
  Layers,
  Library,
  ListChecks,
  Menu,
  PenSquare,
  Search,
  Settings,
  Sparkles,
  SquareStack,
  Wand2,
  BarChart3,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

type NavItem = { label: string; to: string; icon: typeof Gauge; badge?: string };

const nav: { section: string; items: NavItem[] }[] = [
  {
    section: "Overview",
    items: [{ label: "Dashboard", to: "/admin", icon: Gauge }],
  },
  {
    section: "Learning content",
    items: [
      { label: "Categories", to: "/admin/categories", icon: Boxes },
      { label: "Courses", to: "/admin/courses", icon: BookOpen },
      { label: "Chapters", to: "/admin/chapters", icon: Layers },
      { label: "Lessons", to: "/admin/lessons", icon: FileText },
      { label: "Learning resources", to: "/admin/resources", icon: Library },
    ],
  },
  {
    section: "Question bank",
    items: [
      { label: "Questions", to: "/admin/questions", icon: FileQuestion },
      { label: "Question editor", to: "/admin/questions/editor", icon: PenSquare },
      { label: "Question review", to: "/admin/review/questions", icon: ClipboardCheck, badge: "12" },
    ],
  },
  {
    section: "Tests & practice",
    items: [
      { label: "Tests", to: "/admin/tests", icon: ListChecks },
      { label: "Test builder", to: "/admin/tests/builder", icon: SquareStack },
      { label: "Practice sets", to: "/admin/practice", icon: FlaskConical },
      { label: "Results", to: "/admin/results", icon: BarChart3 },
    ],
  },
  {
    section: "AI",
    items: [
      { label: "AI content generator", to: "/admin/ai/content", icon: Wand2 },
      { label: "AI question generator", to: "/admin/ai/questions", icon: Sparkles },
      { label: "AI review queue", to: "/admin/review", icon: Bot, badge: "4" },
    ],
  },
  {
    section: "System",
    items: [
      { label: "Search", to: "/admin/search", icon: Search },
      { label: "Notifications", to: "/admin/notifications", icon: Bell },
      { label: "Settings", to: "/admin/settings", icon: Settings },
    ],
  },
];

function NavContent({ collapsed, onNavigate }: { collapsed: boolean; onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav className="scrollbar-slim flex-1 space-y-6 overflow-y-auto px-3 py-4">
      {nav.map((group) => (
        <div key={group.section}>
          {!collapsed && (
            <p className="px-3 pb-2 text-[0.68rem] font-bold uppercase tracking-widest text-muted-foreground/70">
              {group.section}
            </p>
          )}
          <ul className="space-y-0.5">
            {group.items.map((item) => {
              const active = item.to === "/admin" ? pathname === "/admin" : pathname === item.to;
              return (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    onClick={onNavigate}
                    title={collapsed ? item.label : undefined}
                    className={cn(
                      "group relative flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-all duration-150",
                      active
                        ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
                        : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
                      collapsed && "justify-center px-0",
                    )}
                  >
                    {active && (
                      <span className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-primary" />
                    )}
                    <item.icon
                      className={cn("h-4.5 w-4.5 shrink-0", active && "text-primary")}
                    />
                    {!collapsed && <span className="truncate">{item.label}</span>}
                    {!collapsed && item.badge ? (
                      <span className="ml-auto rounded-full bg-brand-soft px-2 py-0.5 text-[0.65rem] font-bold text-brand">
                        {item.badge}
                      </span>
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

function Brand({ collapsed }: { collapsed?: boolean }) {
  return (
    <Link to="/admin" className="flex items-center gap-2.5 px-1">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary to-brand text-primary-foreground shadow-sm">
        <GraduationCap className="h-5 w-5" />
      </span>
      {!collapsed && (
        <span className="min-w-0">
          <span className="block truncate text-sm font-bold leading-tight">CSharpHub</span>
          <span className="block truncate text-[0.7rem] text-muted-foreground">
            Content Studio
          </span>
        </span>
      )}
    </Link>
  );
}

export function AdminShell({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-background">
      <aside
        className={cn(
          "sticky top-0 hidden h-screen shrink-0 flex-col border-r border-sidebar-border bg-sidebar transition-[width] duration-200 lg:flex",
          collapsed ? "w-[72px]" : "w-[264px]",
        )}
      >
        <div
          className={cn(
            "flex h-16 items-center border-b border-sidebar-border px-4",
            collapsed && "justify-center px-2",
          )}
        >
          <Brand collapsed={collapsed} />
        </div>
        <NavContent collapsed={collapsed} />
        <div className="border-t border-sidebar-border p-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed((c) => !c)}
            className="w-full justify-center text-muted-foreground"
          >
            <ChevronsLeft className={cn("h-4 w-4 transition-transform", collapsed && "rotate-180")} />
            {!collapsed && <span className="ml-1">Collapse</span>}
          </Button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/85 px-4 backdrop-blur-md sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] bg-sidebar p-0">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <div className="flex h-16 items-center border-b border-sidebar-border px-4">
                <Brand />
              </div>
              <NavContent collapsed={false} />
            </SheetContent>
          </Sheet>

          <Link
            to="/admin/search"
            className="hidden h-9 min-w-0 flex-1 items-center gap-2 rounded-xl border border-border bg-secondary/60 px-3 text-sm text-muted-foreground transition-colors hover:bg-secondary sm:flex sm:max-w-md"
          >
            <Search className="h-4 w-4 shrink-0" />
            <span className="truncate">Search courses, lessons, questions…</span>
            <kbd className="ml-auto hidden rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[0.65rem] md:inline">
              ⌘K
            </kbd>
          </Link>

          <div className="ml-auto flex items-center gap-1.5">
            <Button asChild variant="ghost" size="sm" className="hidden text-muted-foreground md:inline-flex">
              <Link to="/learn">Student view</Link>
            </Button>
            <Button asChild variant="ghost" size="icon" className="relative">
              <Link to="/admin/notifications">
                <Bell className="h-4.5 w-4.5" />
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-destructive ring-2 ring-background" />
              </Link>
            </Button>
            <Link to="/admin/settings" className="ml-1 flex items-center gap-2 rounded-full pl-1 pr-2 py-1 transition-colors hover:bg-secondary">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-brand-soft text-xs font-bold text-brand">LN</AvatarFallback>
              </Avatar>
              <span className="hidden text-left leading-tight sm:block">
                <span className="block text-xs font-semibold">Lan Nguyen</span>
                <span className="block text-[0.65rem] text-muted-foreground">Content Manager</span>
              </span>
            </Link>
          </div>
        </header>

        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
