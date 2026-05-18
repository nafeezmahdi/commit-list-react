import { Clock, Calendar } from "lucide-react";
import { useClock } from "../hooks/useClock";

export default function Header() {
  const time = useClock();

  return (
    <header className="sticky top-0 z-50 backdrop-blur shadow-sm bg-white/80">
      <div className="animated-header-bg absolute inset-0 -z-10"></div>
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-6 lg:px-8">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
            CommitList
          </h1>
          <p className="text-sm text-slate-500">
            Your daily command center for tasks, priorities, and productivity.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
          <div className="flex items-center gap-2 rounded-full border border-indigo-200 bg-white px-3 py-1.5 text-indigo-700 shadow-sm">
            <Clock className="h-4 w-4" />
            <span>{time.toLocaleTimeString()}</span>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-sky-200 bg-white px-3 py-1.5 text-sky-700 shadow-sm">
            <Calendar className="h-4 w-4" />
            <span>
              {time.toLocaleDateString(undefined, {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
