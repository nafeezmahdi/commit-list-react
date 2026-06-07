export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto w-full border-t border-white/50 bg-white/40 backdrop-blur-sm">
      <div className="mx-auto max-w-9xl px-4 py-5 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-white/60 bg-white/70 backdrop-blur p-4 text-center text-sm text-slate-600 shadow-sm">
          {year} &copy;{" "}
          <a
            href="https://github.com/nafeezmahdi"
            className="font-semibold text-indigo-600 transition-colors hover:text-indigo-800"
          >
            NM
          </a>
          . All rights reserved.
        </div>
      </div>
    </footer>
  );
}
