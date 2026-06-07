import Footer from "./Footer";
import Header from "./Header";

export default function TodoDetailsError({ onGoBack }) {
  return (
    <div className="page-layout animated-page-bg text-slate-900">
      <Header />
      <main className="flex flex-1 items-center justify-center p-8">
        <article className="max-w-md rounded-xl bg-white p-6 text-center shadow-sm">
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
      </main>
      <Footer />
    </div>
  );
}
