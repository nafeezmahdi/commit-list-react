export default function FilterInput({ label, value, onChange, placeholder }) {
  return (
    <label class="text-sm">
      <span class="mb-1 block text-slate-600">{label}</span>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        class="w-full rounded-md border border-slate-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
      />
    </label>
  );
}
