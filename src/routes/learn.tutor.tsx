import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Bot, Send, Sparkles, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CodeBlock, PageHeader, SectionCard } from "@/components/primitives";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/learn/tutor")({
  head: () => ({
    meta: [
      { title: "AI Tutor — CSharpHub" },
      {
        name: "description",
        content:
          "Ask the CSharpHub AI tutor about C# and OOP concepts and get explanations with runnable code examples.",
      },
      { property: "og:title", content: "AI Tutor — CSharpHub" },
      {
        property: "og:description",
        content: "Get instant, course-aware explanations of C# and OOP concepts.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TutorPage,
});

interface Msg {
  id: number;
  role: "user" | "ai";
  text: string;
  code?: string | undefined;
}

const suggestions = [
  "Explain polymorphism with an example",
  "What is the difference between an interface and an abstract class?",
  "How does LINQ GroupBy work?",
  "When should I use try/catch/finally?",
];

function answerFor(q: string): { text: string; code?: string } {
  const s = q.toLowerCase();
  if (s.includes("polymorph")) {
    return {
      text: "Polymorphism lets one reference type behave differently depending on the concrete object behind it. Declare a `virtual` member on the base class and `override` it in derived classes — the runtime picks the right implementation.",
      code: `public class Shape\n{\n    public virtual double Area() => 0;\n}\n\npublic class Circle : Shape\n{\n    public double Radius { get; init; }\n    public override double Area() => Math.PI * Radius * Radius;\n}\n\nShape shape = new Circle { Radius = 2 };\nConsole.WriteLine(shape.Area()); // 12.566…`,
    };
  }
  if (s.includes("interface") || s.includes("abstract")) {
    return {
      text: "An interface is a pure contract: no state, and a type can implement many of them. An abstract class can hold fields, constructors, and shared implementation, but a class may inherit only one. Reach for an interface when you need capability, an abstract class when you need shared behaviour.",
      code: `public interface IRepository<T>\n{\n    T? FindById(int id);\n}\n\npublic abstract class RepositoryBase<T> : IRepository<T>\n{\n    protected readonly List<T> Items = new();\n    public abstract T? FindById(int id);\n}`,
    };
  }
  if (s.includes("linq") || s.includes("groupby")) {
    return {
      text: "`GroupBy` projects a sequence into groups keyed by whatever you return from the selector. Each group is an `IGrouping<TKey, TElement>`, which is itself enumerable — so you can aggregate inside the projection.",
      code: `var byLevel = courses\n    .GroupBy(c => c.Level)\n    .Select(g => new { Level = g.Key, Count = g.Count() })\n    .OrderByDescending(x => x.Count);`,
    };
  }
  if (s.includes("try") || s.includes("exception") || s.includes("catch")) {
    return {
      text: "Catch only exceptions you can actually handle, order catch blocks from most to least specific, and use `finally` (or `using`) for cleanup that must run either way. Never swallow an exception silently.",
      code: `try\n{\n    using var reader = new StreamReader(path);\n    return reader.ReadToEnd();\n}\ncatch (FileNotFoundException ex)\n{\n    logger.LogWarning(ex, "Missing {Path}", path);\n    return string.Empty;\n}\nfinally\n{\n    stopwatch.Stop();\n}`,
    };
  }
  if (s.includes("encapsulat")) {
    return {
      text: "Encapsulation means the class owns its invariants. Keep fields private and expose behaviour through properties or methods that validate, so no caller can push the object into an invalid state.",
      code: `public class Account\n{\n    private decimal _balance;\n    public decimal Balance => _balance;\n\n    public void Withdraw(decimal amount)\n    {\n        if (amount <= 0 || amount > _balance)\n            throw new ArgumentOutOfRangeException(nameof(amount));\n        _balance -= amount;\n    }\n}`,
    };
  }
  return {
    text: `Good question. In C#, the shortest path to an answer is usually a tiny console project: write the smallest program that shows the behaviour, then change one thing at a time. Tell me which course topic this relates to — encapsulation, inheritance, collections, LINQ, or exceptions — and I'll walk through it step by step with an example.`,
  };
}

function TutorPage() {
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: 0,
      role: "ai",
      text: "Hi! I'm your C# tutor. Ask me about any concept from your courses — I'll explain it and show working code.",
    },
  ]);
  const [input, setInput] = useState("");

  function send(text: string) {
    const q = text.trim();
    if (!q) return;
    const a = answerFor(q);
    setMessages((m) => [
      ...m,
      { id: m.length, role: "user", text: q },
      { id: m.length + 1, role: "ai", text: a.text, code: a.code },
    ]);
    setInput("");
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Learn"
        title="AI Tutor"
        description="Course-aware explanations with real C# examples, available any time."
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
        <SectionCard title="Conversation" bodyClassName="space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={cn("flex gap-3", m.role === "user" && "flex-row-reverse")}
            >
              <span
                className={cn(
                  "grid h-8 w-8 shrink-0 place-items-center rounded-lg",
                  m.role === "ai"
                    ? "bg-gradient-to-br from-primary to-brand text-primary-foreground"
                    : "bg-secondary text-secondary-foreground",
                )}
              >
                {m.role === "ai" ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
              </span>
              <div
                className={cn(
                  "min-w-0 max-w-[85%] rounded-xl px-4 py-3 text-sm leading-6",
                  m.role === "ai" ? "bg-muted/50" : "bg-primary-soft/60",
                )}
              >
                <p>{m.text}</p>
                {m.code ? (
                  <div className="mt-3">
                    <CodeBlock code={m.code} filename="example.cs" />
                  </div>
                ) : null}
              </div>
            </div>
          ))}

          <form
            className="flex gap-2 border-t border-border pt-4"
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about a C# or OOP concept…"
            />
            <Button type="submit" disabled={!input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </SectionCard>

        <SectionCard title="Try asking" bodyClassName="space-y-2">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => send(s)}
              className="flex w-full items-start gap-2 rounded-lg border border-border px-3 py-2 text-left text-sm transition-colors hover:bg-muted/60"
            >
              <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand" />
              <span>{s}</span>
            </button>
          ))}
        </SectionCard>
      </div>
    </div>
  );
}
