import { useState } from "react";
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
import { useTodos } from "./hooks/useTodos";
import { getFilteredTodos, getStats } from "./utils/todoUtils";
import {
  categoriesById,
  lookup,
  prioritiesById,
  priorityClass,
  statusClass,
  statusesById,
  usersById,
} from "./constants/lookupData";

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
  const [filters, setFilters] = useState(INITIAL_FILTERS);

  // Custom Hook replaces all the API/State logic
  const { todos, loading, createTodo } = useTodos();

  // This fallback mock generator helper mimics lengths safely when hitting the general /todos list endpoint
  const getTodoRelated = () => {
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

  // Derived state calculations
  const filteredTodos = getFilteredTodos(todos, filters);
  const statsCards = getStats(todos, statusesById);

  // Pagination
  const startOffset = (filters.page - 1) * PAGE_SIZE;
  const paginatedItems = filteredTodos.slice(
    startOffset,
    startOffset + PAGE_SIZE,
  );
  const totalPagesCount = Math.max(
    1,
    Math.ceil(filteredTodos.length / PAGE_SIZE),
  );

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
