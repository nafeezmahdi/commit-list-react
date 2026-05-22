export default function TodoDetailsError({ onGoBack }) {
  return (
    <div className="min-h-screen animated-page-bg text-slate-900 p-8 flex items-center justify-center">
      <article className="rounded-xl bg-white p-6 shadow-sm max-w-md text-center">
        <h2 className="text-xl font-bold text-slate-800">Todo not found</h2>
        <p className="mt-2 text-slate-600">
          The requested todo does not exist on your SQL instance server.
        </p>
        <button
          onClick={onGoBack}
          className="mt-4 inline-block rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          Back to Dashboard
        </button>
      </article>
    </div>
  );
}
