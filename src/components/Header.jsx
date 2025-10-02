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

// New Icon for the Hackathon button
const TrophyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
);

function Header({ onNavigate }) { // Accept onNavigate prop
  return (
    <header className="border-b border-white/10 p-6 md:p-8">
      <div className="container mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
            <button onClick={() => onNavigate('dashboard')} className="text-left">
                 <h1 className="text-3xl font-extrabold text-white leading-tight tracking-tight">
                    Ethiopian <span className="text-green-400">Tech Pulse</span>
                </h1>
            </button>
          <p className="text-gray-400 mt-2 max-w-2xl">
            A live dashboard tracking the GitHub heartbeat of the Ethiopian developer community.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <div className="flex items-center justify-center gap-3 text-sm text-gray-400 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                <LiveIndicatorIcon />
                <span>Live Data</span>
            </div>
            <button 
                onClick={() => onNavigate('hackathon')} 
                className="flex items-center justify-center gap-2 bg-green-400/10 text-green-300 font-semibold px-4 py-2 rounded-full border border-green-400/20 hover:bg-green-400/20 transition-colors duration-200"
            >
                <TrophyIcon />
                <span>Hackathon Mode</span>
            </button>
        </div>

      </div>
    </header>
  );
}

export default Header;
