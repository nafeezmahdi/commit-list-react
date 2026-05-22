export default function DetailList({ title, items, renderItem, emptyText }) {
  return (
    <div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <ul className="mt-2 space-y-2">
        {items && items.length > 0 ? (
          items.map(renderItem)
        ) : (
          <li className="text-sm text-slate-500">{emptyText}</li>
        )}
      </ul>
    </div>
  );
}
