import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, BookOpen, FileText, Pencil, Plus, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader, SectionCard, StatCard, StatusBadge, LevelBadge } from "@/components/primitives";
import { categories, courses } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/categories/$id")({
  head: () => ({
    meta: [
      { title: "Category detail — CSharpHub Studio" },
      { name: "description", content: "Category information and the C# courses that belong to it." },
      { property: "og:title", content: "Category detail — CSharpHub Studio" },
      { property: "og:description", content: "Category information and the C# courses that belong to it." },
    ],
  }),
  component: CategoryDetail,
});

function CategoryDetail() {
  const { id } = Route.useParams();
  const category = categories.find((c) => c.id === id) ?? categories[0]!;
  const list = courses.filter((c) => c.categoryId === category.id);

  return (
    <div className="space-y-6">
      <Button asChild variant="ghost" size="sm" className="-ml-2 text-muted-foreground">
        <Link to="/admin/categories">
          <ArrowLeft className="h-4 w-4" /> All categories
        </Link>
      </Button>

      <PageHeader
        eyebrow={
          <p className="mb-1 font-mono text-xs text-muted-foreground">/{category.slug}</p>
        }
        title={category.name}
        description={category.description}
        actions={
          <>
            <Button variant="outline">
              <Pencil className="h-4 w-4" /> Edit category
            </Button>
            <Button asChild>
              <Link to="/admin/courses/new">
                <Plus className="h-4 w-4" /> Add course
              </Link>
            </Button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Courses" value={String(category.courses)} icon={BookOpen} tone="primary" />
        <StatCard label="Published" value={String(category.published)} icon={Rocket} tone="success" />
        <StatCard label="Drafts" value={String(category.drafts)} icon={FileText} tone="warning" />
      </div>

      <SectionCard
        title="Courses in this category"
        description={`${list.length} course${list.length === 1 ? "" : "s"} · created ${category.createdAt}`}
        bodyClassName="grid gap-4 p-5 md:grid-cols-2"
      >
        {list.map((course) => (
          <Link
            key={course.id}
            to="/admin/courses/$id"
            params={{ id: course.id }}
            className="group rounded-xl border border-border p-4 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-card"
          >
            <div className={`h-20 w-full rounded-lg bg-gradient-to-br ${course.accent}`} />
            <div className="mt-3 flex items-start justify-between gap-3">
              <h3 className="font-semibold group-hover:text-primary">{course.title}</h3>
              <StatusBadge status={course.status} />
            </div>
            <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{course.description}</p>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <LevelBadge level={course.level} />
              <span>{course.chapters} chapters</span>
              <span>·</span>
              <span>{course.lessons} lessons</span>
            </div>
          </Link>
        ))}
      </SectionCard>
    </div>
  );
}
