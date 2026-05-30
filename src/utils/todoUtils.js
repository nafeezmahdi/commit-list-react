export const getFilteredTodos = (todos, filters) => {
  return todos.filter((todo) => {
    const matchesSearch =
      !filters.search ||
      todo.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      todo.description.toLowerCase().includes(filters.search.toLowerCase());
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
};

export const getStats = (todos, statusesById) => {
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

  return [
    { label: "Total Todos", value: todos.length },
    { label: "Pending", value: pendingCount },
    { label: "In Progress", value: inProgressCount },
    { label: "Completed", value: completedCount },
    { label: "Overdue", value: overdueCount },
  ];
};
