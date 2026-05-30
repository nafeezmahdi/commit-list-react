import { useState, useEffect } from "react";
import StatsSection from "./components/StatsSection";
import FilterSection from "./components/FilterSection";
import LeftSidebar from "./components/LeftSidebar";
import RightSidebar from "./components/RightSidebar";
import TodoFeed from "./components/TodoFeed";
import TodoDetails from "./TodoDetails";
import Footer from "./components/Footer";
import Header from "./components/Header";
import NewTodoModal from "./components/NewTodoModal";
import AddTodoButton from "./components/AddTodoButton";
import axios from "axios";

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
  const [activeTodoId, setActiveTodoId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState(INITIAL_FILTERS);

  // Static Local Mapping Arrays for UI rendering text badges
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
  };

  const byId = (arr, key) =>
    Object.fromEntries(arr.map((item) => [item[key], item]));
  const usersById = byId(lookup.users, "user_id");
  const categoriesById = byId(lookup.categories, "category_id");
  const statusesById = byId(lookup.statuses, "status_id");
  const prioritiesById = byId(lookup.priorities, "priority_id");

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

  // This fallback mock generator helper mimics lengths safely when hitting the general /todos list endpoint
  const getTodoRelated = (todoId) => {
    return {
      subtasks: [],
      tags: [],
      reminders: [],
      comments: [],
      attachments: [],
      recurring: null,
      sharedUsers: [],
    };
  };

  // 1. GET ALL
  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${API_URL}/todos`);
      setTodos(response.data);
    } catch (err) {
      console.error("Error fetching todos:", err.message);
    } finally {
      setLoading(false);
    }
  };

  // 2. POST (Create)
  const createTodo = async (newTodoData) => {
    try {
      await axios.post(`${API_URL}/todos`, newTodoData);
      fetchTodos(); // Refresh the list after adding
    } catch (err) {
      console.error("Error creating todo:", err.message);
    }
  };

  // 3. PUT (Update)
  const updateTodo = async (id, updatedData) => {
    try {
      await axios.put(`${API_URL}/todos/${id}`, updatedData);
      fetchTodos(); // Refresh the list after updating
    } catch (err) {
      console.error("Error updating todo:", err.message);
    }
  };

  // 4. DELETE (Remove)
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/todos/${id}`);
      fetchTodos(); // Refresh the list after deleting

      // If we delete the task we are currently viewing, go back to dashboard
      if (activeTodoId === id) setActiveTodoId(null);
    } catch (err) {
      console.error("Error deleting todo:", err.message);
    }
  };

  useEffect(() => {
    fetchTodos();
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
    return (
      matchesSearch &&
      matchesUser &&
      matchesCategory &&
      matchesStatus &&
      matchesPriority
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
        Loading Board Engine Contexts from Backend...
      </div>
    );

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
      <Header />
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
      {/*  */}
      <Footer />
      <AddTodoButton onClick={() => setIsModalOpen(true)} />
      {/*  */}
      {isModalOpen && (
        <NewTodoModal
          lookup={lookup}
          onClose={() => setIsModalOpen(false)}
          onSuccess={createTodo}
        />
      )}
    </div>
  );
}
