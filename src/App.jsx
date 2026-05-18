import { useState, useEffect } from "react";
import StatsSection from "./components/StatsSection";
import FilterSection from "./components/FilterSection";
import LeftSidebar from "./components/LeftSidebar";
import RightSidebar from "./components/RightSidebar";
import TodoFeed from "./components/TodoFeed";
import TodoDetails from "./TodoDetails";

const API_URL = "http://localhost:5000/api";
const PAGE_SIZE = 8;

const INITIAL_FILTERS = {
  search: "",
  userId: "",
  categoryId: "",
  statusId: "",
  priorityId: "",
  tagId: "",
  page: 1,
};

export default function App() {
  const [activeTodoId, setActiveTodoId] = useState(null); // Triggers deep view toggle page
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [liveTime, setLiveTime] = useState(new Date());

  // Static Local Mapping Arrays representing table entities safely
  const lookup = {
    users: [
      { user_id: 1, name: "Nafeez Mahdi", email: "nafeez@example.com" },
      { user_id: 2, name: "Rahim Uddin", email: "rahim@example.com" },
      { user_id: 3, name: "Ayesha Khan", email: "ayesha@example.com" },
      { user_id: 4, name: "Sadia Akter", email: "sadia@example.com" },
      { user_id: 5, name: "Tanvir Hasan", email: "tanvir@example.com" },
      { user_id: 6, name: "Farhana Rahman", email: "farhana@example.com" },
      { user_id: 7, name: "Imran Hossain", email: "imran@example.com" },
      { user_id: 8, name: "Nusrat Jahan", email: "nusrat@example.com" },
      { user_id: 9, name: "Mehedi Alam", email: "mehedi@example.com" },
      { user_id: 10, name: "Ritu Sultana", email: "ritu@example.com" },
    ],
    categories: [
      { category_id: 1, name: "Work" },
      { category_id: 2, name: "Personal" },
      { category_id: 3, name: "Study" },
      { category_id: 4, name: "Health" },
    ],
    statuses: [
      { status_id: 1, status: "Pending" },
      { status_id: 2, status: "In Progress" },
      { status_id: 3, status: "Completed" },
    ],
    priorities: [
      { priority_id: 1, level: "Low" },
      { priority_id: 2, level: "Medium" },
      { priority_id: 3, level: "High" },
    ],
    tags: [
      { tag_id: 1, name: "Urgent" },
      { tag_id: 2, name: "Home" },
      { tag_id: 3, name: "Exam" },
      { tag_id: 4, name: "Fitness" },
    ],
    subtasks: [
      { subtask_id: 1, todo_id: 101, title: "Design UI", is_completed: false },
      {
        subtask_id: 2,
        todo_id: 101,
        title: "Connect API",
        is_completed: false,
      },
      {
        subtask_id: 3,
        todo_id: 102,
        title: "Read ERD notes",
        is_completed: true,
      },
      { subtask_id: 4, todo_id: 104, title: "Warm-up", is_completed: true },
      {
        subtask_id: 5,
        todo_id: 106,
        title: "Review coding standards",
        is_completed: false,
      },
      {
        subtask_id: 6,
        todo_id: 109,
        title: "Finish generic constraints section",
        is_completed: true,
      },
      {
        subtask_id: 7,
        todo_id: 114,
        title: "Test on small devices",
        is_completed: false,
      },
      {
        subtask_id: 8,
        todo_id: 120,
        title: "Solve 5 tree problems",
        is_completed: false,
      },
    ],
    todoTags: [
      { todo_id: 101, tag_id: 1 },
      { todo_id: 102, tag_id: 3 },
      { todo_id: 103, tag_id: 2 },
      { todo_id: 104, tag_id: 4 },
      { todo_id: 114, tag_id: 1 },
      { todo_id: 115, tag_id: 2 },
      { todo_id: 116, tag_id: 3 },
      { todo_id: 117, tag_id: 4 },
      { todo_id: 118, tag_id: 1 },
      { todo_id: 119, tag_id: 2 },
      { todo_id: 120, tag_id: 3 },
      { todo_id: 121, tag_id: 4 },
    ],
    reminders: [
      { reminder_id: 1, todo_id: 101, reminder_time: "2026-05-09 10:00" },
      { reminder_id: 2, todo_id: 103, reminder_time: "2026-05-06 08:00" },
      { reminder_id: 3, todo_id: 104, reminder_time: "2026-05-07 06:00" },
      { reminder_id: 4, todo_id: 114, reminder_time: "2026-05-09 10:30" },
      { reminder_id: 5, todo_id: 118, reminder_time: "2026-05-10 09:00" },
    ],
    comments: [
      {
        comment_id: 1,
        todo_id: 101,
        user_id: 2,
        text: "Don't forget testing",
        created_at: "2026-05-05",
      },
      {
        comment_id: 2,
        todo_id: 102,
        user_id: 3,
        text: "Practice more examples",
        created_at: "2026-05-05",
      },
      {
        comment_id: 3,
        todo_id: 114,
        user_id: 5,
        text: "Please verify on iPhone width too",
        created_at: "2026-05-07",
      },
      {
        comment_id: 4,
        todo_id: 118,
        user_id: 1,
        text: "Let's include auth stories in backlog",
        created_at: "2026-05-07",
      },
    ],
    attachments: [
      { attachment_id: 1, todo_id: 101, file_url: "design.png" },
      { attachment_id: 2, todo_id: 105, file_url: "presentation.pptx" },
      { attachment_id: 3, todo_id: 118, file_url: "sprint-plan.xlsx" },
      { attachment_id: 4, todo_id: 120, file_url: "dsa-notes.pdf" },
    ],
    recurringTasks: [
      { recurring_id: 1, todo_id: 103, repeat_type: "Daily" },
      { recurring_id: 2, todo_id: 121, repeat_type: "Weekly" },
    ],
    sharedTodos: [
      { todo_id: 101, user_id: 2 },
      { todo_id: 104, user_id: 1 },
      { todo_id: 114, user_id: 9 },
      { todo_id: 118, user_id: 4 },
    ],
  };

  const byId = (arr, key) =>
    Object.fromEntries(arr.map((item) => [item[key], item]));
  const usersById = byId(lookup.users, "user_id");
  const categoriesById = byId(lookup.categories, "category_id");
  const statusesById = byId(lookup.statuses, "status_id");
  const prioritiesById = byId(lookup.priorities, "priority_id");
  const tagsById = byId(lookup.tags, "tag_id");

  const statusClass = {
    Pending: "bg-amber-100 text-amber-800",
    "In Progress": "bg-blue-100 text-blue-800",
    Completed: "bg-emerald-100 text-emerald-800",
  };
  const priorityClass = {
    Low: "bg-slate-200 text-slate-700",
    Medium: "bg-orange-100 text-orange-800",
    High: "bg-rose-100 text-rose-800",
  };

  const getTodoRelated = (todoId) => {
    return {
      subtasks: lookup.subtasks.filter((s) => s.todo_id === todoId),
      tags: lookup.todoTags
        .filter((tt) => tt.todo_id === todoId)
        .map((l) => tagsById[l.tag_id])
        .filter(Boolean),
      reminders: lookup.reminders.filter((r) => r.todo_id === todoId),
      comments: lookup.comments.filter((c) => c.todo_id === todoId),
      attachments: lookup.attachments.filter((a) => a.todo_id === todoId),
      recurring: lookup.recurringTasks.find((r) => r.todo_id === todoId),
      sharedUsers: lookup.sharedTodos
        .filter((s) => s.todo_id === todoId)
        .map((sh) => usersById[sh.user_id])
        .filter(Boolean),
    };
  };

  useEffect(() => {
    fetch(`${API_URL}/todos`)
      .then((res) => res.json())
      .then((data) => {
        setTodos(data);
        setLoading(false);
      });

    const clockTimer = setInterval(() => setLiveTime(new Date()), 1000);
    return () => clearInterval(clockTimer);
  }, []);

  const filteredTodos = todos.filter((todo) => {
    const matchesSearch =
      !filters.search ||
      todo.title.toLowerCase().includes(filters.search) ||
      todo.description.toLowerCase().includes(filters.search);
    const matchesUser =
      !filters.userId || String(todo.user_id) === filters.userId;
    const matchesCategory =
      !filters.categoryId || String(todo.category_id) === filters.categoryId;
    const matchesStatus =
      !filters.statusId || String(todo.status_id) === filters.statusId;
    const matchesPriority =
      !filters.priorityId || String(todo.priority_id) === filters.priorityId;
    const matchesTag =
      !filters.tagId ||
      lookup.todoTags.some(
        (t) => t.todo_id === todo.todo_id && String(t.tag_id) === filters.tagId,
      );
    return (
      matchesSearch &&
      matchesUser &&
      matchesCategory &&
      matchesStatus &&
      matchesPriority &&
      matchesTag
    );
  });

  const completedCount = todos.filter(
    (t) => statusesById[t.status_id]?.status === "Completed",
  ).length;
  const pendingCount = todos.filter(
    (t) => statusesById[t.status_id]?.status === "Pending",
  ).length;
  const inProgressCount = todos.filter(
    (t) => statusesById[t.status_id]?.status === "In Progress",
  ).length;
  const overdueCount = todos.filter(
    (t) =>
      t.due_date < "2026-05-06" &&
      statusesById[t.status_id]?.status !== "Completed",
  ).length;

  const statsCards = [
    { label: "Total Todos", value: todos.length },
    { label: "Pending", value: pendingCount },
    { label: "In Progress", value: inProgressCount },
    { label: "Completed", value: completedCount },
    { label: "Overdue", value: overdueCount },
  ];

  const startOffset = (filters.page - 1) * PAGE_SIZE;
  const paginatedItems = filteredTodos.slice(
    startOffset,
    startOffset + PAGE_SIZE,
  );
  const totalPagesCount = Math.max(
    1,
    Math.ceil(filteredTodos.length / PAGE_SIZE),
  );

  if (loading)
    return (
      <div className="text-center p-12 text-slate-500 font-semibold">
        Loading Board Engine Contexts...
      </div>
    );

  // Toggle page view rendering seamlessly while keeping structural integrity
  if (activeTodoId) {
    return (
      <TodoDetails
        todoId={activeTodoId}
        onGoBack={() => setActiveTodoId(null)}
      />
    );
  }

  return (
    <div class="min-h-screen animated-page-bg text-slate-900">
      <header class="sticky top-0 z-50 backdrop-blur shadow-sm">
        <div class="animated-header-bg absolute inset-0 -z-10"></div>
        <div class="mx-auto flex max-w-9xl flex-col gap-4 px-4 py-4 relative z-10 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-6 lg:px-8">
          <div class="flex items-center gap-3">
            <div class="h-11 w-11 rounded-xl shadow-sm bg-indigo-600 flex items-center justify-center font-bold text-white text-xl">
              CL
            </div>
            <div>
              <h1 class="text-2xl font-extrabold tracking-tight sm:text-3xl">
                <span class="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
                  CommitList
                </span>
              </h1>
              <p class="text-sm text-slate-500">
                Your daily command center for tasks, priorities, and
                productivity.
              </p>
            </div>
          </div>
          <div class="flex flex-wrap items-center gap-2 text-xs font-semibold">
            <div class="flex items-center gap-2 rounded-full border border-indigo-200 bg-gradient-to-r from-white to-indigo-50 px-3 py-1.5 text-indigo-700 shadow-sm">
              <span class="font-bold tracking-wide">
                {liveTime.toLocaleTimeString()}
              </span>
            </div>
            <div class="flex items-center gap-2 rounded-full border border-sky-200 bg-gradient-to-r from-white to-sky-50 px-3 py-1.5 text-sky-700 shadow-sm">
              <span class="font-semibold">
                {liveTime.toLocaleDateString(undefined, {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>
      </header>

      <main class="mx-auto max-w-9xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <StatsSection stats={statsCards} />

        <FilterSection
          filters={filters}
          setFilters={setFilters}
          lookup={lookup}
          onReset={() => setFilters(INITIAL_FILTERS)}
        />

        <section class="grid gap-6 lg:grid-cols-4">
          <LeftSidebar
            lookup={lookup}
            filters={filters}
            setFilters={setFilters}
            statusClass={statusClass}
            priorityClass={priorityClass}
          />

          <TodoFeed
            pageItems={paginatedItems}
            total={filteredTodos.length}
            filters={filters}
            setFilters={setFilters}
            totalPages={totalPagesCount}
            start={startOffset}
            pageSize={PAGE_SIZE}
            usersById={usersById}
            categoriesById={categoriesById}
            statusesById={statusesById}
            prioritiesById={prioritiesById}
            getTodoRelated={getTodoRelated}
            statusClass={statusClass}
            priorityClass={priorityClass}
            onCardClick={(id) => setActiveTodoId(id)}
          />

          <RightSidebar
            lookup={lookup}
            filters={filters}
            setFilters={setFilters}
          />
        </section>
      </main>

      <footer class="mt-12">
        <div class="mx-auto max-w-9xl px-4 pb-8 sm:px-6 lg:px-8">
          <div class="rounded-xl border border-white/60 bg-white/70 backdrop-blur p-4 text-center text-sm text-slate-600 shadow-sm">
            2026 &copy; <span class="font-semibold text-slate-800">NM</span>.
            All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
