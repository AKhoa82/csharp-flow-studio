import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin-shell";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Content Studio — CSharpHub" },
      { name: "description", content: "Manage C# and OOP courses, lessons, question banks and AI-assisted content." },
      { property: "og:title", content: "Content Studio — CSharpHub" },
      { property: "og:description", content: "Manage C# and OOP courses, lessons, question banks and AI-assisted content." },
    ],
  }),
  component: () => (
    <AdminShell>
      <Outlet />
    </AdminShell>
  ),
});
