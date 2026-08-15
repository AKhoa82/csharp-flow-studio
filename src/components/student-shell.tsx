import { Link, useRouterState } from "@tanstack/react-router";
import {
  BarChart3,
  Bell,
  Bot,
  Compass,
  GraduationCap,
  LayoutGrid,
  Menu,
  Search,
  Target,
  Trophy,
} from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const links = [
  { label: "Dashboard", to: "/learn", icon: LayoutGrid, tour: undefined },
  { label: "Browse courses", to: "/learn/courses", icon: Compass, tour: "courses" },
  { label: "Practice", to: "/learn/practice", icon: Target, tour: "practice" },
  { label: "Analytics", to: "/learn/analytics", icon: BarChart3, tour: undefined },
  { label: "AI Tutor", to: "/learn/tutor", icon: Bot, tour: undefined },
  { label: "Search", to: "/learn/search", icon: Search, tour: undefined },
];


export function StudentShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const items = links.map((l) => {
    const active = l.to === "/learn" ? pathname === "/learn" : pathname.startsWith(l.to);
    return (
      <Link
        key={l.to}
        to={l.to}
        data-tour={l.tour}
        className={cn(
          "flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-colors",
          active
            ? "bg-primary-soft text-primary"
            : "text-muted-foreground hover:bg-secondary hover:text-foreground",
        )}
      >
        <l.icon className="h-4 w-4" />
        {l.label}
      </Link>
    );
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
          <Link to="/learn" className="flex shrink-0 items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-brand text-primary-foreground">
              <GraduationCap className="h-5 w-5" />
            </span>
            <span className="hidden text-sm font-bold sm:block">CSharpHub</span>
          </Link>

          <nav className="ml-4 hidden items-center gap-1 md:flex">{items}</nav>

          <div className="ml-auto flex items-center gap-1.5">
            <span className="hidden items-center gap-1.5 rounded-full border border-warning/25 bg-warning-soft px-3 py-1 text-xs font-semibold text-warning-foreground sm:inline-flex">
              <Trophy className="h-3.5 w-3.5" /> 12 day streak
            </span>
            <Button asChild variant="ghost" size="sm" className="hidden text-muted-foreground lg:inline-flex">
              <Link to="/admin">Manager view</Link>
            </Button>
            <Button variant="ghost" size="icon">
              <Bell className="h-4.5 w-4.5" />
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary-soft text-xs font-bold text-primary">TV</AvatarFallback>
            </Avatar>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[260px]">
                <SheetTitle className="mb-4">Menu</SheetTitle>
                <div className="space-y-1">{items}</div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}
