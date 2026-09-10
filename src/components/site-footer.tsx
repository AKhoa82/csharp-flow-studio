import { Link } from "@tanstack/react-router";
import { GraduationCap, Github, Twitter, Mail } from "lucide-react";

type FooterVariant = "admin" | "student" | "landing";

const footerLinks = [
  {
    title: "Platform",
    links: [
      { label: "Courses", to: "/learn/courses" },
      { label: "Practice", to: "/learn/practice" },
      { label: "Analytics", to: "/learn/analytics" },
      { label: "AI Tutor", to: "/learn/tutor" },
    ],
  },
  {
    title: "Studio",
    links: [
      { label: "Dashboard", to: "/admin" },
      { label: "Question bank", to: "/admin/questions" },
      { label: "Tests", to: "/admin/tests" },
      { label: "AI generator", to: "/admin/ai/content" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Search", to: "/learn/search" },
      { label: "Settings", to: "/admin/settings" },
      { label: "Notifications", to: "/admin/notifications" },
    ],
  },
] as const;

export function SiteFooter({ variant = "student" }: { variant?: FooterVariant }) {
  const year = new Date().getFullYear();

  return (
    <footer
      className={
        variant === "admin"
          ? "border-t border-sidebar-border bg-sidebar px-4 py-8 text-sidebar-foreground sm:px-6 lg:px-8"
          : variant === "landing"
            ? "border-t border-border bg-background px-6 py-10"
            : "border-t border-border bg-background/60 px-4 py-8 sm:px-6 lg:px-8"
      }
    >
      <div className={variant === "landing" ? "mx-auto max-w-7xl" : ""}>
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          {/* Brand */}
          <div className="max-w-xs">
            <Link to="/" className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-brand text-primary-foreground">
                <GraduationCap className="h-5 w-5" />
              </span>
              <span className="text-sm font-bold">CSharpHub</span>
            </Link>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              The C# & OOP self-learning platform with an AI-assisted content
              management studio. Built for students and content managers.
            </p>
            <div className="mt-4 flex items-center gap-2">
              {[
                { icon: Github, label: "GitHub" },
                { icon: Twitter, label: "Twitter" },
                { icon: Mail, label: "Email" },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="grid h-8 w-8 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {footerLinks.map((col) => (
              <div key={col.title}>
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground/70">
                  {col.title}
                </p>
                <ul className="mt-3 space-y-2">
                  {col.links.map((l) => (
                    <li key={l.to}>
                      <Link
                        to={l.to}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {year} CSharpHub. Built for C# & OOP learners.</p>
          <p className="flex items-center gap-3">
            <a href="#" className="transition-colors hover:text-foreground">Privacy</a>
            <span className="text-border">·</span>
            <a href="#" className="transition-colors hover:text-foreground">Terms</a>
            <span className="text-border">·</span>
            <a href="#" className="transition-colors hover:text-foreground">Status</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
