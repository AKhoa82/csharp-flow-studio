import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader, SectionCard } from "@/components/primitives";

export const Route = createFileRoute("/admin/settings")({
  head: () => ({
    meta: [
      { title: "Settings — CSharpHub Studio" },
      { name: "description", content: "Workspace, content workflow and AI generation settings." },
      { property: "og:title", content: "Settings — CSharpHub Studio" },
      { property: "og:description", content: "Workspace, content workflow and AI generation settings." },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="Workspace, workflow and AI configuration for the content module."
        actions={<Button onClick={() => toast.success("Settings saved")}>Save changes</Button>}
      />
      <Tabs defaultValue="workspace">
        <TabsList>
          <TabsTrigger value="workspace">Workspace</TabsTrigger>
          <TabsTrigger value="workflow">Content workflow</TabsTrigger>
          <TabsTrigger value="ai">AI</TabsTrigger>
        </TabsList>

        <TabsContent value="workspace" className="mt-4 grid gap-4 lg:grid-cols-2">
          <SectionCard title="Profile" bodyClassName="space-y-4 p-5">
            <div className="space-y-1.5"><Label>Display name</Label><Input defaultValue="Lan Nguyen" /></div>
            <div className="space-y-1.5"><Label>Email</Label><Input defaultValue="lan.nguyen@university.edu" /></div>
            <div className="space-y-1.5"><Label>Bio</Label><Textarea rows={3} defaultValue="Lecturer in software engineering. Maintains the C# and OOP curriculum." /></div>
          </SectionCard>
          <SectionCard title="Preferences" bodyClassName="space-y-4 p-5">
            <label className="flex items-center justify-between text-sm">Dark mode <Switch /></label>
            <label className="flex items-center justify-between text-sm">Email digests <Switch defaultChecked /></label>
            <label className="flex items-center justify-between text-sm">Notify me on AI generation <Switch defaultChecked /></label>
            <div className="space-y-1.5">
              <Label>Language</Label>
              <Select defaultValue="en">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="en">English</SelectItem><SelectItem value="vi">Tiếng Việt</SelectItem></SelectContent>
              </Select>
            </div>
          </SectionCard>
        </TabsContent>

        <TabsContent value="workflow" className="mt-4 grid gap-4 lg:grid-cols-2">
          <SectionCard title="Review rules" bodyClassName="space-y-4 p-5">
            <label className="flex items-center justify-between text-sm">Require review before publishing <Switch defaultChecked /></label>
            <label className="flex items-center justify-between text-sm">Require a reason when rejecting <Switch defaultChecked /></label>
            <label className="flex items-center justify-between text-sm">Allow authors to approve own content <Switch /></label>
          </SectionCard>
          <SectionCard title="Integrations" bodyClassName="space-y-4 p-5">
            <div className="space-y-1.5"><Label>User module API endpoint</Label><Input defaultValue="https://api.csharphub.edu/users/v1" className="font-mono text-xs" /></div>
            <p className="rounded-xl bg-muted/60 p-3 text-xs text-muted-foreground">
              Authors, reviewers and student accounts are provided by the separate User module over REST.
            </p>
          </SectionCard>
        </TabsContent>

        <TabsContent value="ai" className="mt-4 grid gap-4 lg:grid-cols-2">
          <SectionCard title="Generation defaults" bodyClassName="space-y-4 p-5">
            <div className="space-y-1.5">
              <Label>Default model</Label>
              <Select defaultValue="gpt5">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt5">GPT-5 · education tuned</SelectItem>
                  <SelectItem value="flash">Fast draft model</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5"><Label>Default questions per generation</Label><Input type="number" defaultValue={8} /></div>
          </SectionCard>
          <SectionCard title="Safety" bodyClassName="space-y-4 p-5">
            <label className="flex items-center justify-between text-sm">AI content always starts as draft <Switch defaultChecked disabled /></label>
            <label className="flex items-center justify-between text-sm">Label AI content for students <Switch defaultChecked /></label>
            <label className="flex items-center justify-between text-sm">Restrict AI Tutor to course knowledge <Switch defaultChecked /></label>
          </SectionCard>
        </TabsContent>
      </Tabs>
    </div>
  );
}
