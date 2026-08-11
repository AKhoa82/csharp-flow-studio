export type Status = "draft" | "review" | "approved" | "published" | "rejected";
export type Level = "Beginner" | "Intermediate" | "Advanced";
export type Difficulty = "Easy" | "Medium" | "Hard";
export type QuestionType =
  | "Single Choice"
  | "Multiple Choice"
  | "True / False"
  | "Fill in the Blank";

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  courses: number;
  published: number;
  drafts: number;
  createdAt: string;
  status: Status;
}

export interface Course {
  id: string;
  categoryId: string;
  title: string;
  slug: string;
  description: string;
  level: Level;
  status: Status;
  chapters: number;
  lessons: number;
  questions: number;
  author: string;
  createdAt: string;
  updatedAt: string;
  accent: string;
  progress: number;
}

export interface Lesson {
  id: string;
  title: string;
  slug: string;
  minutes: number;
  status: Status;
  aiGenerated?: boolean;
}

export interface Chapter {
  id: string;
  courseId: string;
  index: number;
  title: string;
  summary: string;
  lessons: Lesson[];
}

export interface QuestionOption {
  id: string;
  text: string;
  correct: boolean;
}

export interface Question {
  id: string;
  content: string;
  type: QuestionType;
  courseId: string;
  chapter: string;
  lesson: string;
  difficulty: Difficulty;
  status: Status;
  aiGenerated: boolean;
  createdAt: string;
  explanation: string;
  options: QuestionOption[];
}

export const categories: Category[] = [
  {
    id: "cat-1",
    name: "C# Fundamentals",
    slug: "csharp-fundamentals",
    description: "Syntax, variables, control flow and the .NET runtime basics.",
    courses: 6,
    published: 4,
    drafts: 2,
    createdAt: "2026-01-12",
    status: "published",
  },
  {
    id: "cat-2",
    name: "Object-Oriented Programming",
    slug: "oop",
    description: "Classes, encapsulation, inheritance, polymorphism and interfaces.",
    courses: 5,
    published: 3,
    drafts: 2,
    createdAt: "2026-01-20",
    status: "published",
  },
  {
    id: "cat-3",
    name: "Collections & LINQ",
    slug: "collections-linq",
    description: "Lists, dictionaries, generics and query expressions in C#.",
    courses: 3,
    published: 2,
    drafts: 1,
    createdAt: "2026-02-03",
    status: "published",
  },
  {
    id: "cat-4",
    name: "Error Handling & Debugging",
    slug: "error-handling",
    description: "Exceptions, try/catch/finally, custom exceptions and diagnostics.",
    courses: 2,
    published: 1,
    drafts: 1,
    createdAt: "2026-02-19",
    status: "draft",
  },
  {
    id: "cat-5",
    name: "Advanced C#",
    slug: "advanced-csharp",
    description: "Delegates, events, async/await and memory management.",
    courses: 4,
    published: 2,
    drafts: 2,
    createdAt: "2026-03-04",
    status: "approved",
  },
];

export const courses: Course[] = [
  {
    id: "csharp-fundamentals",
    categoryId: "cat-1",
    title: "C# Fundamentals",
    slug: "csharp-fundamentals",
    description:
      "Start from zero: install the .NET SDK, write your first program, and master variables, data types, operators and control flow.",
    level: "Beginner",
    status: "published",
    chapters: 6,
    lessons: 24,
    questions: 148,
    author: "Dr. Lan Nguyen",
    createdAt: "2026-01-14",
    updatedAt: "2026-08-02",
    accent: "from-primary/25 to-brand/20",
    progress: 100,
  },
  {
    id: "oop-in-csharp",
    categoryId: "cat-2",
    title: "Object-Oriented Programming in C#",
    slug: "oop-in-csharp",
    description:
      "Model real problems with classes and objects. Encapsulation, inheritance, polymorphism, abstract classes and interfaces.",
    level: "Intermediate",
    status: "published",
    chapters: 8,
    lessons: 31,
    questions: 206,
    author: "Dr. Lan Nguyen",
    createdAt: "2026-01-28",
    updatedAt: "2026-08-09",
    accent: "from-brand/25 to-info/20",
    progress: 62,
  },
  {
    id: "collections-and-linq",
    categoryId: "cat-3",
    title: "Collections and LINQ",
    slug: "collections-and-linq",
    description:
      "Work with arrays, List<T>, Dictionary<K,V>, generics and query data elegantly using LINQ.",
    level: "Intermediate",
    status: "approved",
    chapters: 5,
    lessons: 18,
    questions: 96,
    author: "Minh Tran",
    createdAt: "2026-02-11",
    updatedAt: "2026-07-27",
    accent: "from-info/25 to-primary/20",
    progress: 28,
  },
  {
    id: "exception-handling",
    categoryId: "cat-4",
    title: "Exception Handling in C#",
    slug: "exception-handling",
    description:
      "Write resilient code with try/catch/finally, exception filters and your own exception types.",
    level: "Intermediate",
    status: "draft",
    chapters: 4,
    lessons: 12,
    questions: 54,
    author: "Minh Tran",
    createdAt: "2026-03-02",
    updatedAt: "2026-08-05",
    accent: "from-warning/25 to-primary/20",
    progress: 0,
  },
  {
    id: "advanced-csharp",
    categoryId: "cat-5",
    title: "Advanced C#: Delegates, Events & Async",
    slug: "advanced-csharp",
    description:
      "Delegates, lambda expressions, events, Task-based asynchronous programming and performance tips.",
    level: "Advanced",
    status: "review",
    chapters: 7,
    lessons: 26,
    questions: 121,
    author: "Hoang Pham",
    createdAt: "2026-03-18",
    updatedAt: "2026-08-10",
    accent: "from-brand/30 to-primary/15",
    progress: 5,
  },
  {
    id: "csharp-interview-prep",
    categoryId: "cat-2",
    title: "C# & OOP Interview Preparation",
    slug: "csharp-interview-prep",
    description:
      "Curated question sets and practice tests covering the most asked C# and OOP interview topics.",
    level: "Advanced",
    status: "published",
    chapters: 5,
    lessons: 15,
    questions: 240,
    author: "Hoang Pham",
    createdAt: "2026-04-06",
    updatedAt: "2026-08-08",
    accent: "from-success/25 to-info/15",
    progress: 41,
  },
];

export const chapters: Chapter[] = [
  {
    id: "ch-1",
    courseId: "csharp-fundamentals",
    index: 1,
    title: "Introduction to C#",
    summary: "What C# is, the .NET platform, tooling and your first program.",
    lessons: [
      { id: "l-1", title: "What is C#?", slug: "what-is-csharp", minutes: 8, status: "published" },
      { id: "l-2", title: "Installing .NET", slug: "installing-dotnet", minutes: 10, status: "published" },
      { id: "l-3", title: "Your First C# Program", slug: "first-csharp-program", minutes: 12, status: "published" },
    ],
  },
  {
    id: "ch-2",
    courseId: "csharp-fundamentals",
    index: 2,
    title: "Variables and Data Types",
    summary: "Value types, reference types, conversion and constants.",
    lessons: [
      { id: "l-4", title: "Variables", slug: "variables", minutes: 11, status: "published" },
      { id: "l-5", title: "Data Types", slug: "data-types", minutes: 14, status: "published" },
      { id: "l-6", title: "Type Conversion", slug: "type-conversion", minutes: 9, status: "approved", aiGenerated: true },
    ],
  },
  {
    id: "ch-3",
    courseId: "csharp-fundamentals",
    index: 3,
    title: "Control Flow",
    summary: "Branching and looping constructs used every day.",
    lessons: [
      { id: "l-7", title: "if / else and switch", slug: "if-else-switch", minutes: 13, status: "published" },
      { id: "l-8", title: "for, while and foreach", slug: "loops", minutes: 15, status: "review", aiGenerated: true },
      { id: "l-9", title: "break, continue and goto", slug: "jump-statements", minutes: 7, status: "draft" },
    ],
  },
  {
    id: "ch-4",
    courseId: "csharp-fundamentals",
    index: 4,
    title: "Methods",
    summary: "Parameters, return values, overloading and expression bodies.",
    lessons: [
      { id: "l-10", title: "Declaring Methods", slug: "declaring-methods", minutes: 12, status: "published" },
      { id: "l-11", title: "Parameters: ref, out, params", slug: "parameters", minutes: 16, status: "draft", aiGenerated: true },
    ],
  },
  {
    id: "ch-5",
    courseId: "oop-in-csharp",
    index: 1,
    title: "Classes and Objects",
    summary: "Fields, properties, constructors and object lifetime.",
    lessons: [
      { id: "l-12", title: "Defining a Class", slug: "defining-a-class", minutes: 12, status: "published" },
      { id: "l-13", title: "Properties and Auto-properties", slug: "properties", minutes: 10, status: "published" },
      { id: "l-14", title: "Constructors", slug: "constructors", minutes: 11, status: "published" },
    ],
  },
  {
    id: "ch-6",
    courseId: "oop-in-csharp",
    index: 2,
    title: "Encapsulation",
    summary: "Access modifiers and protecting invariants.",
    lessons: [
      { id: "l-15", title: "Access Modifiers", slug: "access-modifiers", minutes: 9, status: "published" },
      { id: "l-16", title: "Encapsulation in Practice", slug: "encapsulation-practice", minutes: 14, status: "review", aiGenerated: true },
    ],
  },
  {
    id: "ch-7",
    courseId: "oop-in-csharp",
    index: 3,
    title: "Inheritance & Polymorphism",
    summary: "Base classes, virtual members, overriding and abstraction.",
    lessons: [
      { id: "l-17", title: "Inheritance Basics", slug: "inheritance-basics", minutes: 13, status: "published" },
      { id: "l-18", title: "virtual, override, sealed", slug: "virtual-override", minutes: 15, status: "published" },
      { id: "l-19", title: "Abstract Classes", slug: "abstract-classes", minutes: 12, status: "approved" },
      { id: "l-20", title: "Interfaces", slug: "interfaces", minutes: 16, status: "draft", aiGenerated: true },
    ],
  },
];

export const sampleCode = `public class Student
{
    public string Name { get; set; }
    public int Credits { get; private set; }

    public Student(string name) => Name = name;

    public void Enroll(int credits)
    {
        if (credits <= 0)
            throw new ArgumentOutOfRangeException(nameof(credits));

        Credits += credits;
    }

    public void Introduce()
    {
        Console.WriteLine($"Hello, {Name}");
    }
}`;

export const lessonContent = {
  title: "Encapsulation in Practice",
  intro:
    "Encapsulation is the OOP principle of hiding internal state and exposing behaviour through a controlled public surface. In C# you achieve it with access modifiers, properties and validation inside methods.",
  objectives: [
    "Explain why exposing public fields breaks invariants",
    "Convert public fields into properties with validation",
    "Choose the right access modifier for a member",
  ],
  callout:
    "Rule of thumb: a class should never let external code put it into an invalid state. If a value has rules, it belongs behind a property or a method.",
};

export const questions: Question[] = [
  {
    id: "q-1",
    content: "Which access modifier makes a member visible only inside the declaring class?",
    type: "Single Choice",
    courseId: "oop-in-csharp",
    chapter: "Encapsulation",
    lesson: "Access Modifiers",
    difficulty: "Easy",
    status: "published",
    aiGenerated: false,
    createdAt: "2026-05-02",
    explanation:
      "`private` restricts access to the declaring type. `protected` also allows derived types, `internal` allows the same assembly, and `public` allows everyone.",
    options: [
      { id: "o1", text: "public", correct: false },
      { id: "o2", text: "private", correct: true },
      { id: "o3", text: "protected", correct: false },
      { id: "o4", text: "internal", correct: false },
    ],
  },
  {
    id: "q-2",
    content: "Select all statements that are true about interfaces in C#.",
    type: "Multiple Choice",
    courseId: "oop-in-csharp",
    chapter: "Inheritance & Polymorphism",
    lesson: "Interfaces",
    difficulty: "Medium",
    status: "approved",
    aiGenerated: true,
    createdAt: "2026-06-11",
    explanation:
      "A class can implement many interfaces but inherit only one base class. Since C# 8, interfaces may provide default implementations.",
    options: [
      { id: "o1", text: "A class can implement multiple interfaces", correct: true },
      { id: "o2", text: "Interfaces can declare instance fields", correct: false },
      { id: "o3", text: "Interfaces may contain default method implementations (C# 8+)", correct: true },
      { id: "o4", text: "An interface can inherit from another interface", correct: true },
    ],
  },
  {
    id: "q-3",
    content: "A `struct` in C# is a reference type.",
    type: "True / False",
    courseId: "csharp-fundamentals",
    chapter: "Variables and Data Types",
    lesson: "Data Types",
    difficulty: "Easy",
    status: "published",
    aiGenerated: false,
    createdAt: "2026-04-22",
    explanation: "A struct is a value type stored inline; classes are reference types stored on the heap.",
    options: [
      { id: "o1", text: "True", correct: false },
      { id: "o2", text: "False", correct: true },
    ],
  },
  {
    id: "q-4",
    content: "Complete the code: the keyword used to prevent further overriding of a virtual member is ______.",
    type: "Fill in the Blank",
    courseId: "oop-in-csharp",
    chapter: "Inheritance & Polymorphism",
    lesson: "virtual, override, sealed",
    difficulty: "Medium",
    status: "draft",
    aiGenerated: true,
    createdAt: "2026-07-08",
    explanation: "`sealed override` stops the member from being overridden further down the hierarchy.",
    options: [{ id: "o1", text: "sealed", correct: true }],
  },
  {
    id: "q-5",
    content: "Which LINQ operator returns a projection of each element in a sequence?",
    type: "Single Choice",
    courseId: "collections-and-linq",
    chapter: "Query Operators",
    lesson: "Select and Where",
    difficulty: "Easy",
    status: "published",
    aiGenerated: false,
    createdAt: "2026-05-30",
    explanation: "`Select` projects each element; `Where` filters, `Aggregate` folds, `OrderBy` sorts.",
    options: [
      { id: "o1", text: "Where", correct: false },
      { id: "o2", text: "Select", correct: true },
      { id: "o3", text: "Aggregate", correct: false },
      { id: "o4", text: "OrderBy", correct: false },
    ],
  },
  {
    id: "q-6",
    content: "What happens when an exception is thrown inside a `finally` block?",
    type: "Single Choice",
    courseId: "exception-handling",
    chapter: "try / catch / finally",
    lesson: "The finally Block",
    difficulty: "Hard",
    status: "review",
    aiGenerated: true,
    createdAt: "2026-07-19",
    explanation:
      "The new exception replaces the in-flight exception and propagates up, which is why finally blocks should not throw.",
    options: [
      { id: "o1", text: "It is silently swallowed", correct: false },
      { id: "o2", text: "It replaces the original exception and propagates", correct: true },
      { id: "o3", text: "The runtime terminates immediately", correct: false },
      { id: "o4", text: "It is wrapped in an AggregateException", correct: false },
    ],
  },
  {
    id: "q-7",
    content: "Which collection guarantees O(1) average lookup by key?",
    type: "Single Choice",
    courseId: "collections-and-linq",
    chapter: "Generic Collections",
    lesson: "Dictionary<TKey,TValue>",
    difficulty: "Medium",
    status: "approved",
    aiGenerated: true,
    createdAt: "2026-06-25",
    explanation: "Dictionary<TKey,TValue> is hash-based, giving amortised O(1) lookups.",
    options: [
      { id: "o1", text: "List<T>", correct: false },
      { id: "o2", text: "Dictionary<TKey,TValue>", correct: true },
      { id: "o3", text: "Queue<T>", correct: false },
      { id: "o4", text: "LinkedList<T>", correct: false },
    ],
  },
  {
    id: "q-8",
    content: "`async` methods should generally return ______ instead of `void`.",
    type: "Fill in the Blank",
    courseId: "advanced-csharp",
    chapter: "Asynchronous Programming",
    lesson: "async / await",
    difficulty: "Hard",
    status: "draft",
    aiGenerated: true,
    createdAt: "2026-08-01",
    explanation: "`Task` (or `Task<T>`) allows callers to await and observe exceptions; `async void` cannot be awaited.",
    options: [{ id: "o1", text: "Task", correct: true }],
  },
];

export interface ResourceItem {
  id: string;
  title: string;
  type: "PDF" | "Video" | "Article" | "Code Sample" | "Slide Deck";
  course: string;
  lesson: string;
  size: string;
  addedAt: string;
  status: Status;
}

export const resources: ResourceItem[] = [
  { id: "r-1", title: "C# Language Cheat Sheet", type: "PDF", course: "C# Fundamentals", lesson: "Variables", size: "1.2 MB", addedAt: "2026-05-04", status: "published" },
  { id: "r-2", title: "Installing the .NET SDK (walkthrough)", type: "Video", course: "C# Fundamentals", lesson: "Installing .NET", size: "84 MB", addedAt: "2026-05-08", status: "published" },
  { id: "r-3", title: "SOLID principles explained with C#", type: "Article", course: "OOP in C#", lesson: "Interfaces", size: "—", addedAt: "2026-06-02", status: "approved" },
  { id: "r-4", title: "Bank account encapsulation demo", type: "Code Sample", course: "OOP in C#", lesson: "Encapsulation in Practice", size: "26 KB", addedAt: "2026-06-14", status: "draft" },
  { id: "r-5", title: "LINQ query operators reference", type: "Slide Deck", course: "Collections and LINQ", lesson: "Select and Where", size: "4.8 MB", addedAt: "2026-07-01", status: "published" },
  { id: "r-6", title: "Exception handling anti-patterns", type: "Article", course: "Exception Handling in C#", lesson: "The finally Block", size: "—", addedAt: "2026-07-21", status: "review" },
];

export interface TestItem {
  id: string;
  title: string;
  course: string;
  questions: number;
  duration: number;
  difficulty: Difficulty;
  status: Status;
  createdAt: string;
  attempts: number;
  avgScore: number;
}

export const tests: TestItem[] = [
  { id: "t-1", title: "C# Fundamentals — Final Assessment", course: "C# Fundamentals", questions: 40, duration: 60, difficulty: "Medium", status: "published", createdAt: "2026-05-18", attempts: 412, avgScore: 78 },
  { id: "t-2", title: "Variables & Data Types Quiz", course: "C# Fundamentals", questions: 15, duration: 20, difficulty: "Easy", status: "published", createdAt: "2026-05-22", attempts: 658, avgScore: 86 },
  { id: "t-3", title: "OOP Pillars Checkpoint", course: "OOP in C#", questions: 25, duration: 35, difficulty: "Medium", status: "approved", createdAt: "2026-06-09", attempts: 240, avgScore: 71 },
  { id: "t-4", title: "Inheritance & Polymorphism Deep Dive", course: "OOP in C#", questions: 30, duration: 45, difficulty: "Hard", status: "draft", createdAt: "2026-07-02", attempts: 0, avgScore: 0 },
  { id: "t-5", title: "LINQ Practice Set", course: "Collections and LINQ", questions: 20, duration: 25, difficulty: "Medium", status: "published", createdAt: "2026-07-15", attempts: 189, avgScore: 74 },
  { id: "t-6", title: "Exception Handling Mock Test", course: "Exception Handling in C#", questions: 18, duration: 30, difficulty: "Hard", status: "review", createdAt: "2026-08-03", attempts: 0, avgScore: 0 },
];

export const activity = [
  { id: "a-1", who: "Lan Nguyen", action: "published the course", target: "C# Fundamentals", time: "12 minutes ago", kind: "publish" as const },
  { id: "a-2", who: "AI Generator", action: "generated 12 questions for", target: "Interfaces", time: "48 minutes ago", kind: "ai" as const },
  { id: "a-3", who: "Minh Tran", action: "approved the lesson", target: "Abstract Classes", time: "2 hours ago", kind: "approve" as const },
  { id: "a-4", who: "Hoang Pham", action: "updated the lesson", target: "async / await", time: "5 hours ago", kind: "edit" as const },
  { id: "a-5", who: "AI Generator", action: "drafted a lesson for", target: "Type Conversion", time: "Yesterday", kind: "ai" as const },
  { id: "a-6", who: "Lan Nguyen", action: "created the chapter", target: "Collections & Generics", time: "Yesterday", kind: "create" as const },
];

export const pendingReview = [
  { id: "pr-1", title: "Interfaces — full lesson draft", kind: "Lesson", course: "OOP in C#", by: "GPT-5 · AI", time: "35m ago" },
  { id: "pr-2", title: "12 questions on polymorphism", kind: "Questions", course: "OOP in C#", by: "GPT-5 · AI", time: "1h ago" },
  { id: "pr-3", title: "for / while / foreach lesson", kind: "Lesson", course: "C# Fundamentals", by: "GPT-5 · AI", time: "3h ago" },
  { id: "pr-4", title: "8 questions on async/await", kind: "Questions", course: "Advanced C#", by: "GPT-5 · AI", time: "Yesterday" },
];

export const contentGrowth = [
  { month: "Feb", lessons: 24, questions: 120 },
  { month: "Mar", lessons: 38, questions: 210 },
  { month: "Apr", lessons: 52, questions: 340 },
  { month: "May", lessons: 71, questions: 480 },
  { month: "Jun", lessons: 89, questions: 640 },
  { month: "Jul", lessons: 108, questions: 812 },
  { month: "Aug", lessons: 126, questions: 965 },
];

export const questionsByDifficulty = [
  { difficulty: "Easy", count: 412 },
  { difficulty: "Medium", count: 386 },
  { difficulty: "Hard", count: 167 },
];

export const coursesByLevel = [
  { name: "Beginner", value: 8, fill: "var(--color-chart-1)" },
  { name: "Intermediate", value: 11, fill: "var(--color-chart-2)" },
  { name: "Advanced", value: 6, fill: "var(--color-chart-4)" },
];

export const statusDistribution = [
  { name: "Published", value: 62, fill: "var(--color-chart-5)" },
  { name: "Approved", value: 21, fill: "var(--color-chart-1)" },
  { name: "In review", value: 11, fill: "var(--color-chart-3)" },
  { name: "Draft", value: 26, fill: "var(--color-chart-2)" },
];

export const aiVsManual = [
  { month: "Apr", ai: 62, manual: 118 },
  { month: "May", ai: 104, manual: 132 },
  { month: "Jun", ai: 168, manual: 145 },
  { month: "Jul", ai: 214, manual: 151 },
  { month: "Aug", ai: 268, manual: 160 },
];

export const notifications = [
  { id: "n-1", title: "AI generated 12 questions", body: "Polymorphism question set is waiting for your review.", time: "35m ago", unread: true, kind: "ai" as const },
  { id: "n-2", title: "Lesson approved", body: "Minh Tran approved “Abstract Classes”.", time: "2h ago", unread: true, kind: "approve" as const },
  { id: "n-3", title: "Course published", body: "“C# Fundamentals” is now live for 1,284 students.", time: "5h ago", unread: false, kind: "publish" as const },
  { id: "n-4", title: "Review requested", body: "Hoang Pham submitted “async / await” for review.", time: "Yesterday", unread: false, kind: "review" as const },
  { id: "n-5", title: "Content rejected", body: "“goto statements” lesson was rejected: needs examples.", time: "2 days ago", unread: false, kind: "reject" as const },
];

export const weakTopics = [
  { topic: "Polymorphism", accuracy: 48 },
  { topic: "Interfaces", accuracy: 56 },
  { topic: "Exception filters", accuracy: 61 },
  { topic: "LINQ grouping", accuracy: 67 },
];

export const getCourse = (id: string) => courses.find((c) => c.id === id) ?? courses[0]!;
export const getCategory = (id: string) => categories.find((c) => c.id === id) ?? categories[0]!;
export const chaptersOf = (courseId: string) => chapters.filter((c) => c.courseId === courseId);
