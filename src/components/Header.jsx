import { useEffect, useState } from "react";
import Logo from "../assets/commitlist-logo.svg";
import ClockIcon from "../assets/clock-icon.svg";
import CalendarIcon from "../assets/calendar-icon.svg";

export default function Header() {
  const [liveTime, setLiveTime] = useState(new Date());

  useEffect(() => {
    const clockTimer = setInterval(() => setLiveTime(new Date()), 1000);
    return () => clearInterval(clockTimer);
  }, []);

  return (
    <header class="sticky top-0 z-50 backdrop-blur shadow-sm">
      <div class="animated-header-bg absolute inset-0 -z-10"></div>
      <div class="mx-auto flex max-w-9xl flex-col gap-4 px-4 py-4 relative z-10 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-6 lg:px-8">
        <div class="flex items-center gap-3">
          <img
            src={Logo}
            alt="CommitList logo"
            class="h-11 w-11 rounded-xl shadow-sm"
          />
          <div>
            <h1 class="text-2xl font-extrabold tracking-tight sm:text-3xl">
              <a
                href="/"
                class="bg-linear-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent hover:opacity-90"
                title="Open CommitList home"
              >
                CommitList
              </a>
            </h1>
            <p class="text-sm text-slate-500">
              Your daily command center for tasks, priorities, and productivity
              — built for people who want to get things done.
            </p>
          </div>
        </div>
        <div class="flex flex-wrap items-center gap-2 text-xs font-semibold">
          <div class="flex items-center gap-2 rounded-full border border-indigo-200 bg-linear-to-r from-white to-indigo-50 px-3 py-1.5 text-indigo-700 shadow-sm">
            <img src={ClockIcon} alt="Clock icon" class="h-4 w-4" />
            <span class="font-bold tracking-wide">
              {liveTime.toLocaleTimeString()}
            </span>
          </div>
          <div class="flex items-center gap-2 rounded-full border border-sky-200 bg-linear-to-r from-white to-sky-50 px-3 py-1.5 text-sky-700 shadow-sm">
            <img src={CalendarIcon} alt="Calendar icon" class="h-4 w-4" />
            <span class="font-semibold">
              {liveTime.toLocaleDateString(undefined, {
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
