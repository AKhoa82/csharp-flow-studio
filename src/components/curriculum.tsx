import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ChevronDown,
  GripVertical,
  Pencil,
  Plus,
  Trash2,
  Clock,
  FileText,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { AIBadge, StatusBadge } from "@/components/primitives";
import type { Chapter } from "@/lib/mock-data";

export function Curriculum({ data }: { data: Chapter[] }) {
  const [items, setItems] = useState(data);
  const [open, setOpen] = useState<string[]>(data.map((c) => c.id));
  const [dragging, setDragging] = useState<string | null>(null);

  const toggle = (id: string) =>
    setOpen((o) => (o.includes(id) ? o.filter((x) => x !== id) : [...o, id]));

  const onDrop = (targetId: string) => {
    if (!dragging || dragging === targetId) return;
    const next = [...items];
    const from = next.findIndex((c) => c.id === dragging);
    const to = next.findIndex((c) => c.id === targetId);
    const [moved] = next.splice(from, 1);
    if (moved) next.splice(to, 0, moved);
    setItems(next);
    setDragging(null);
    toast.success("Chapter order updated");
  };

  return (
    <div className="space-y-3">
      {items.map((chapter, i) => {
        const expanded = open.includes(chapter.id);
        return (
          <div
            key={chapter.id}
            draggable
            onDragStart={() => setDragging(chapter.id)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => onDrop(chapter.id)}
            className={cn(
              "surface overflow-hidden transition-all",
              dragging === chapter.id && "opacity-50 ring-2 ring-primary",
            )}
          >
            <div className="flex items-center gap-3 p-4">
              <GripVertical className="h-4 w-4 shrink-0 cursor-grab text-muted-foreground active:cursor-grabbing" />
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary-soft font-mono text-xs font-bold text-primary">
                {String(i + 1).padStart(2, "0")}
              </span>
              <button onClick={() => toggle(chapter.id)} className="min-w-0 flex-1 text-left">
                <p className="truncate font-semibold">{chapter.title}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {chapter.lessons.length} lessons · {chapter.summary}
                </p>
              </button>
              <div className="flex shrink-0 items-center gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toast("Edit chapter")}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  onClick={() => {
                    setItems((s) => s.filter((c) => c.id !== chapter.id));
                    toast.error("Chapter deleted", { description: chapter.title });
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toggle(chapter.id)}>
                  <ChevronDown className={cn("h-4 w-4 transition-transform", expanded && "rotate-180")} />
                </Button>
              </div>
            </div>

            {expanded ? (
              <ul className="border-t border-border bg-muted/30 p-2">
                {chapter.lessons.map((lesson, li) => (
                  <li
                    key={lesson.id}
                    className="group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-background"
                  >
                    <GripVertical className="h-4 w-4 shrink-0 cursor-grab text-muted-foreground/50 opacity-0 transition-opacity group-hover:opacity-100" />
                    <span className="w-14 shrink-0 font-mono text-[0.7rem] text-muted-foreground">
                      L{String(li + 1).padStart(2, "0")}
                    </span>
                    <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
                    <Link
                      to="/admin/lessons/$id"
                      params={{ id: lesson.id }}
                      className="min-w-0 flex-1 truncate text-sm font-medium hover:text-primary"
                    >
                      {lesson.title}
                    </Link>
                    {lesson.aiGenerated ? <AIBadge label="AI" /> : null}
                    <span className="hidden items-center gap-1 text-xs text-muted-foreground sm:flex">
                      <Clock className="h-3.5 w-3.5" /> {lesson.minutes}m
                    </span>
                    <StatusBadge status={lesson.status} />
                  </li>
                ))}
                <li className="px-3 pb-1 pt-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground"
                    onClick={() => toast("Add lesson to " + chapter.title)}
                  >
                    <Plus className="h-4 w-4" /> Add lesson
                  </Button>
                </li>
              </ul>
            ) : null}
          </div>
        );
      })}

      <Button
        variant="outline"
        className="w-full border-dashed"
        onClick={() => toast.success("Chapter added", { description: "New chapter appended to the curriculum." })}
      >
        <Plus className="h-4 w-4" /> Add chapter
      </Button>
    </div>
  );
}
