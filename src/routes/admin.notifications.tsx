import { createFileRoute } from "@tanstack/react-router";
import { Bell, CheckCircle2, Rocket, Sparkles, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/primitives";
import { notifications } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications — CSharpHub Studio" },
      { name: "description", content: "Review requests, approvals, publications and AI generation events." },
      { property: "og:title", content: "Notifications — CSharpHub Studio" },
      { property: "og:description", content: "Review requests, approvals, publications and AI generation events." },
    ],
  }),
  component: NotificationsPage,
});

const icons = { ai: Sparkles, approve: CheckCircle2, publish: Rocket, review: Bell, reject: X };

function NotificationsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Notifications"
        description="Everything that needs your attention in the content pipeline."
        actions={<Button variant="outline" onClick={() => toast.success("All marked as read")}>Mark all as read</Button>}
      />
      <Tabs defaultValue="all">
        <TabsList>
          {["all", "unread", "reviews", "ai"].map((t) => (<TabsTrigger key={t} value={t} className="capitalize">{t}</TabsTrigger>))}
        </TabsList>
      </Tabs>
      <div className="surface divide-y divide-border overflow-hidden">
        {notifications.map((n) => {
          const Icon = icons[n.kind];
          return (
            <div key={n.id} className={cn("flex gap-3 px-5 py-4 transition-colors hover:bg-muted/40", n.unread && "bg-primary-soft/40")}>
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-secondary text-muted-foreground"><Icon className="h-4 w-4" /></span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold">{n.title}</p>
                <p className="text-sm text-muted-foreground">{n.body}</p>
              </div>
              <span className="shrink-0 text-xs text-muted-foreground">{n.time}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
