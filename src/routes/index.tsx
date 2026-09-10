import { createFileRoute, Link } from "@tanstack/react-router";
import { GraduationCap, ShieldCheck, Sparkles, BookOpen, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { CodeBlock } from "@/components/primitives";
import { SiteFooter } from "@/components/site-footer";
import { sampleCode } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sign in — CSharpHub C# Learning Platform" },
      {
        name: "description",
        content:
          "Sign in to CSharpHub, the C# and OOP self-learning platform with an AI-assisted content management studio.",
      },
      { property: "og:title", content: "Sign in — CSharpHub C# Learning Platform" },
      {
        property: "og:description",
        content: "C# and OOP self-learning platform with an AI-assisted content management studio.",
      },
    ],
  }),
  component: Login,
});

function Login() {
  return (
    <div className="flex min-h-screen flex-col">
    <div className="grid flex-1 lg:grid-cols-2">
      <div className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <div className="flex items-center gap-2.5">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-primary to-brand text-primary-foreground">
              <GraduationCap className="h-5 w-5" />
            </span>
            <span>
              <span className="block text-sm font-bold leading-tight">CSharpHub</span>
              <span className="block text-xs text-muted-foreground">C# & OOP learning platform</span>
            </span>
          </div>

          <h1 className="mt-10 text-2xl font-bold tracking-tight">Welcome back</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Sign in to continue managing and learning C# content.
          </p>

          <form className="mt-8 space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="lan.nguyen@university.edu" defaultValue="lan.nguyen@university.edu" />
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <button type="button" className="text-xs font-medium text-primary hover:underline">
                  Forgot password?
                </button>
              </div>
              <Input id="password" type="password" defaultValue="password" />
            </div>
            <label className="flex items-center gap-2 text-sm text-muted-foreground">
              <Checkbox defaultChecked /> Keep me signed in
            </label>

            <div className="grid gap-2 pt-2">
              <Button asChild size="lg" className="w-full">
                <Link to="/admin">
                  Sign in as Content Manager <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full">
                <Link to="/learn">
                  <BookOpen className="h-4 w-4" /> Continue as Student
                </Link>
              </Button>
            </div>
          </form>

          <p className="mt-8 text-xs text-muted-foreground">
            Protected by the University SSO gateway · Accounts are provisioned by the User module.
          </p>
        </div>
      </div>

      <div className="relative hidden overflow-hidden border-l border-border bg-gradient-to-br from-primary-soft via-background to-brand-soft lg:block">
        <div className="flex h-full flex-col justify-center px-14">
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-brand/25 bg-background/70 px-3 py-1 text-xs font-semibold text-brand backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" /> AI-assisted content studio
          </span>
          <h2 className="mt-6 max-w-md text-3xl font-bold leading-tight tracking-tight">
            Build, review and publish C# curriculum in one place.
          </h2>
          <p className="mt-3 max-w-md text-sm text-muted-foreground">
            Courses, chapters, lessons, resources, question banks and tests — with an AI generator
            whose output always passes through human review before publishing.
          </p>

          <div className="mt-8 max-w-lg">
            <CodeBlock code={sampleCode} filename="Student.cs" />
          </div>

          <div className="mt-8 flex flex-wrap gap-6 text-sm">
            {[
              { icon: BookOpen, label: "24 courses", sub: "126 lessons" },
              { icon: Sparkles, label: "965 questions", sub: "268 AI drafted" },
              { icon: ShieldCheck, label: "100% reviewed", sub: "before publish" },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-2.5">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-background/80 text-primary">
                  <s.icon className="h-4 w-4" />
                </span>
                <span>
                  <span className="block font-semibold">{s.label}</span>
                  <span className="block text-xs text-muted-foreground">{s.sub}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    <SiteFooter variant="landing" />
    </div>
  );
}
