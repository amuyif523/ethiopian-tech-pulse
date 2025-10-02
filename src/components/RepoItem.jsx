import React from 'react';
import Badge from './Badge'; // Import the new Badge component
import { getRepoBadge } from '../utils/badgeLogic'; // Import the badge logic

// A simple Star icon component for displaying stargazers count
const StarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-4 h-4 text-yellow-400"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.116 3.986 1.24 5.383c.294 1.282-.958 2.297-2.174 1.642l-4.79-2.684-4.79 2.684c-1.216.655-2.468-.36-2.174-1.642l1.24-5.383L1.64 10.955c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.007z"
      clipRule="evenodd"
    />
  </svg>
);

function RepoItem({ item, index }) {
  const description = item.description || "No description provided.";
  const badge = getRepoBadge(item); // Check for a badge

  return (
    <a
      href={item.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-start gap-4 p-3 rounded-lg transition-all duration-200 hover:bg-white/5"
      aria-label={`View repository ${item.full_name} on GitHub`}
    >
      <div className="w-8 flex-shrink-0 text-center text-lg font-bold text-gray-400 group-hover:text-green-400 mt-1">
        {index + 1}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
           <img
            src={item.owner?.avatar_url}
            alt={`${item.owner?.login}'s avatar`}
            className="w-5 h-5 rounded-full object-cover ring-1 ring-white/10"
            loading="lazy"
          />
          <h3 className="text-md font-semibold text-white truncate">{item.full_name}</h3>
          {/* Conditionally render the badge if it exists */}
          {badge && <Badge badge={badge} />}
        </div>

        <p className="text-sm text-gray-400 mt-2 line-clamp-2">
          {description}
        </p>

        {item.language && (
          <span className="inline-block mt-3 text-xs text-blue-300 bg-blue-500/10 px-2 py-1 rounded-full border border-blue-500/20">
            {item.language}
          </span>
        )}
      </div>

      <div className="flex-shrink-0 flex items-center gap-1 text-md text-gray-300 font-semibold">
        <StarIcon />
        <span>{(item.stargazers_count || 0).toLocaleString()}</span>
      </div>
    </a>
  );
}

export default RepoItem;
