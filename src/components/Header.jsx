import React from "react";

// A simple SVG icon to add a visual cue next to the live stats.
const LiveIndicatorIcon = () => (
  <svg
    className="w-3 h-3 text-green-400"
    fill="currentColor"
    viewBox="0 0 8 8"
    aria-hidden="true"
  >
    <circle cx={4} cy={4} r={3} />
  </svg>
);

function Header() {
  return (
    <header className="border-b border-white/10 p-6 md:p-8">
      <div className="container mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white leading-tight tracking-tight">
            Ethiopian <span className="text-green-400">Tech Pulse</span>
          </h1>
          <p className="text-gray-400 mt-2 max-w-2xl">
            A live dashboard tracking the GitHub heartbeat of the Ethiopian developer community.
          </p>
        </div>

        <div className="flex items-center gap-3 text-sm text-gray-400 bg-white/5 px-4 py-2 rounded-full border border-white/10">
          <LiveIndicatorIcon />
          <span>Live Data</span>
        </div>
      </div>
    </header>
  );
}

export default Header;