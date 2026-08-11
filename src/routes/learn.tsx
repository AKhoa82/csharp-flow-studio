import { createFileRoute, Outlet } from "@tanstack/react-router";
import { StudentShell } from "@/components/student-shell";

export const Route = createFileRoute("/learn")({
  head: () => ({
    meta: [
      { title: "Learn C# — CSharpHub" },
      { name: "description", content: "Learn C# and object-oriented programming with lessons, practice questions and an AI tutor." },
      { property: "og:title", content: "Learn C# — CSharpHub" },
      { property: "og:description", content: "Learn C# and object-oriented programming with lessons, practice and an AI tutor." },
    ],
  }),
  component: () => (
    <StudentShell>
      <Outlet />
    </StudentShell>
  ),
});
