import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Boxes, Eye, MoreHorizontal, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { EmptyState, PageHeader, StatusBadge } from "@/components/primitives";
import { categories } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/categories/")({
  head: () => ({
    meta: [
      { title: "Categories — CSharpHub Studio" },
      { name: "description", content: "Organise the C# curriculum into categories such as Fundamentals, OOP, LINQ and Advanced C#." },
      { property: "og:title", content: "Categories — CSharpHub Studio" },
      { property: "og:description", content: "Organise the C# curriculum into categories." },
    ],
  }),
  component: CategoriesPage,
});

function CreateCategoryDialog() {
  const [name, setName] = useState("");
  const [touched, setTouched] = useState(false);
  const slug = name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const invalid = touched && name.trim().length < 3;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4" /> New category
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create category</DialogTitle>
          <DialogDescription>
            Categories group related C# courses, e.g. “Object-Oriented Programming”.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="cat-name">Name</Label>
            <Input
              id="cat-name"
              value={name}
              onBlur={() => setTouched(true)}
              onChange={(e) => setName(e.target.value)}
              placeholder="Collections & LINQ"
              aria-invalid={invalid}
            />
            {invalid ? (
              <p className="text-xs font-medium text-destructive">
                Name must be at least 3 characters.
              </p>
            ) : null}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="cat-slug">Slug</Label>
            <Input id="cat-slug" value={slug} readOnly placeholder="collections-linq" className="font-mono text-xs" />
            <p className="text-xs text-muted-foreground">Generated automatically from the name.</p>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="cat-desc">Description</Label>
            <Textarea id="cat-desc" rows={3} placeholder="Lists, dictionaries, generics and query expressions in C#." />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button
            onClick={() => toast.success("Category created", { description: name || "New category saved as draft." })}
          >
            Create category
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function CategoriesPage() {
  const [query, setQuery] = useState("");
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);
  const rows = categories.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Categories"
        description="Top-level grouping for every C# course in the catalogue."
        actions={<CreateCategoryDialog />}
      />

      <div className="surface overflow-hidden">
        <div className="flex flex-wrap items-center gap-3 border-b border-border p-4">
          <div className="relative min-w-0 flex-1 sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search categories…"
              className="pl-9"
            />
          </div>
          <p className="ml-auto text-xs text-muted-foreground">{rows.length} categories</p>
        </div>

        {rows.length === 0 ? (
          <EmptyState
            icon={Boxes}
            title="No categories match your search"
            description="Try a different keyword, or create a new category to group your C# courses."
            action={<CreateCategoryDialog />}
          />
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>Name</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead className="hidden lg:table-cell">Description</TableHead>
                  <TableHead className="text-right">Courses</TableHead>
                  <TableHead className="hidden md:table-cell">Created</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-10" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((c) => (
                  <TableRow key={c.id} className="group">
                    <TableCell>
                      <Link to="/admin/categories/$id" params={{ id: c.id }} className="flex items-center gap-3">
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
                          <Boxes className="h-4 w-4" />
                        </span>
                        <span className="font-semibold group-hover:text-primary">{c.name}</span>
                      </Link>
                    </TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">{c.slug}</TableCell>
                    <TableCell className="hidden max-w-sm truncate text-sm text-muted-foreground lg:table-cell">
                      {c.description}
                    </TableCell>
                    <TableCell className="text-right font-semibold tabular-nums">{c.courses}</TableCell>
                    <TableCell className="hidden text-sm text-muted-foreground md:table-cell">{c.createdAt}</TableCell>
                    <TableCell>
                      <StatusBadge status={c.status} />
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link to="/admin/categories/$id" params={{ id: c.id }}>
                              <Eye className="h-4 w-4" /> View
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem onSelect={() => toast("Editing " + c.name)}>
                            <Pencil className="h-4 w-4" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            variant="destructive"
                            onSelect={() => setPendingDelete(c.name)}
                          >
                            <Trash2 className="h-4 w-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      <AlertDialog open={pendingDelete !== null} onOpenChange={(o) => !o && setPendingDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete “{pendingDelete}”?</AlertDialogTitle>
            <AlertDialogDescription>
              Courses in this category will not be deleted, but they will become uncategorised.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => toast.error("Category deleted", { description: pendingDelete ?? "" })}
            >
              Delete category
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
