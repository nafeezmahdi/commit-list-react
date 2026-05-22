export default function FilterSelect({
  label,
  value,
  onChange,
  options,
  valueKey = "value",
  labelKey = "label",
}) {
  return (
    <label class="text-sm">
      <span class="mb-1 block text-slate-600">{label}</span>
      <select
        value={value}
        onChange={onChange}
        class="w-full rounded-md border border-slate-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
      >
        <option value="">All</option>
        {options.map((option) => (
          <option key={option[valueKey]} value={option[valueKey]}>
            {option[labelKey]}
          </option>
        ))}
      </select>
    </label>
  );
}
