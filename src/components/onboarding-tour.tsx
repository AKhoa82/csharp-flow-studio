import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { Compass, GraduationCap, Sparkles, Target, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "csharphub.onboarding.v1";

type Step = {
  id: string;
  target?: string;
  title: string;
  body: string;
  icon: typeof Compass;
};

const steps: Step[] = [
  {
    id: "welcome",
    title: "Welcome to CSharpHub",
    body: "A 30-second tour of the three things you will use most: practice drills, the course library, and your progress tracking.",
    icon: GraduationCap,
  },
  {
    id: "practice",
    target: "practice",
    title: "Practice",
    body: "Short question sets with instant feedback. Run a quick mixed drill, focus on one course, or target the topics you keep missing.",
    icon: Target,
  },
  {
    id: "courses",
    target: "courses",
    title: "Browse courses",
    body: "The full C# and OOP library, filterable by category and level. Open a course to see its chapters, lessons and attached tests.",
    icon: Compass,
  },
  {
    id: "progress",
    target: "progress",
    title: "Your progress",
    body: "Streak, completed lessons, practice accuracy and tests passed update as you learn. Below, the weekly chart and weak topics show where to spend time next.",
    icon: TrendingUp,
  },
  {
    id: "resume",
    target: "continue",
    title: "Pick up where you left off",
    body: "Continue learning always points at your next lesson. That is the fastest way back in each day.",
    icon: Sparkles,
  },
];

type Rect = { top: number; left: number; width: number; height: number };

const PAD = 8;

function readRect(target?: string): Rect | null {
  if (!target) return null;
  const el = document.querySelector<HTMLElement>(`[data-tour="${target}"]`);
  if (!el) return null;
  const r = el.getBoundingClientRect();
  if (r.width === 0 || r.height === 0) return null;
  return {
    top: r.top - PAD,
    left: r.left - PAD,
    width: r.width + PAD * 2,
    height: r.height + PAD * 2,
  };
}

export function OnboardingTour() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [rect, setRect] = useState<Rect | null>(null);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setOpen(true);
    } catch {
      /* storage unavailable */
    }
  }, []);

  const step = steps[index]!;

  const sync = useCallback(() => {
    setRect(readRect(step.target));
  }, [step.target]);

  useLayoutEffect(() => {
    if (!open) return;
    const el = step.target
      ? document.querySelector<HTMLElement>(`[data-tour="${step.target}"]`)
      : null;
    el?.scrollIntoView({ block: "center", behavior: "smooth" });
    sync();
    const id = window.setTimeout(sync, 350);
    window.addEventListener("resize", sync);
    window.addEventListener("scroll", sync, true);
    return () => {
      window.clearTimeout(id);
      window.removeEventListener("resize", sync);
      window.removeEventListener("scroll", sync, true);
    };
  }, [open, step.target, sync]);

  const finish = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, "done");
    } catch {
      /* storage unavailable */
    }
    setOpen(false);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") finish();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, finish]);

  if (!open) return null;

  const last = index === steps.length - 1;
  const viewportH = typeof window === "undefined" ? 0 : window.innerHeight;
  const below = rect ? rect.top + rect.height + 12 : 0;
  const placeBelow = rect ? below + 220 < viewportH : true;

  const cardStyle: React.CSSProperties = rect
    ? {
        position: "fixed",
        top: placeBelow ? below : undefined,
        bottom: placeBelow ? undefined : Math.max(16, viewportH - rect.top + 12),
        left: 16,
        right: 16,
        maxWidth: 380,
        marginLeft: "auto",
        marginRight: "auto",
      }
    : {};

  return (
    <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label="Product tour">
      <div
        className={cn("absolute inset-0", rect ? "" : "bg-foreground/55 backdrop-blur-[2px]")}
        onClick={finish}
      />

      {rect ? (
        <div
          className="pointer-events-none fixed rounded-2xl ring-2 ring-primary transition-all duration-300"
          style={{
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height,
            boxShadow:
              "0 0 0 9999px color-mix(in oklch, var(--color-foreground) 55%, transparent)",
          }}
        />
      ) : null}

      <div
        className={cn(
          "surface relative z-10 w-[min(380px,calc(100vw-2rem))] p-5 shadow-pop",
          rect ? "" : "mx-auto mt-[22vh]",
        )}
        style={cardStyle}
      >
        <div className="flex items-start gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
            <step.icon className="h-4.5 w-4.5" />
          </span>
          <div className="min-w-0">
            <p className="text-sm font-semibold">{step.title}</p>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">{step.body}</p>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5">
            {steps.map((s, i) => (
              <span
                key={s.id}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  i === index ? "w-5 bg-primary" : "w-1.5 bg-border",
                )}
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="text-muted-foreground" onClick={finish}>
              {last ? "Close" : "Skip"}
            </Button>
            {index > 0 && !last ? (
              <Button variant="outline" size="sm" onClick={() => setIndex((i) => i - 1)}>
                Back
              </Button>
            ) : null}
            <Button size="sm" onClick={() => (last ? finish() : setIndex((i) => i + 1))}>
              {last ? "Start learning" : "Next"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function restartOnboardingTour() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* storage unavailable */
  }
  window.location.reload();
}
