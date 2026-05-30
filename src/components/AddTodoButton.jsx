export default function AddTodoButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      title="Create New Task"
      className="fixed bottom-8 right-8 z-50 flex h-14 cursor-pointer items-center justify-center gap-2 rounded-full bg-indigo-600 px-6 text-white shadow-xl shadow-indigo-600/30 transition-all hover:-translate-y-1 hover:scale-105 hover:bg-indigo-700 active:scale-95 sm:bottom-10 sm:right-10"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2.5"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
      </svg>
      <span className="font-semibold tracking-wide">New Todo</span>
    </button>
  );
}
