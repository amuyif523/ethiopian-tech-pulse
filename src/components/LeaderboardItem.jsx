import React from 'react';

// A simple arrow icon for the hover effect
const ArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

function LeaderboardItem({ item, index }) {
  return (
    <a
      href={item.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-4 p-3 rounded-lg transition-all duration-200 hover:bg-white/5"
      aria-label={`View ${item.login}'s GitHub profile`}
    >
      <div className="w-8 flex-shrink-0 text-center text-lg font-bold text-gray-400 group-hover:text-green-400">
        {index + 1}
      </div>

      <img
        src={item.avatar_url}
        alt={`${item.login}'s avatar`}
        className="w-12 h-12 rounded-full object-cover ring-2 ring-white/10"
        loading="lazy"
      />

      <div className="flex-1 min-w-0">
        <h3 className="text-md font-semibold text-white truncate">{item.login}</h3>
        <p className="text-sm text-gray-400">View Profile</p>
      </div>

      <div className="text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <ArrowIcon />
      </div>
    </a>
  );
}

export default LeaderboardItem;