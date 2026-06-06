// Helper for Metadata rows
const MetaRow = ({ label, value }) => (
  <p>
    <span className="font-semibold text-slate-800">{label}:</span> {value}
  </p>
);

export default function TodoMetaData({ todo, cleanDate }) {
  const sharedText =
    todo.shared_with && todo.shared_with.length
      ? todo.shared_with.map((u) => u.name).join(", ")
      : "Only assignee";

  //    {todo.recurring_settings
  //    ? todo.recurring_settings.repeat_type
  //    : "No"}

  <div className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
    <MetaRow label="Assignee ID" value={`User #${todo.user_id}`} />
    <MetaRow label="Category" value={todo.category_name ?? "-"} />
    <MetaRow label="Due Date" value={cleanDate} />
    <MetaRow
      label="Recurring"
      value={todo.recurring_settings?.repeat_type ?? "No"}
    />
    <MetaRow label="Shared With" value={sharedText} />
  </div>;
}
