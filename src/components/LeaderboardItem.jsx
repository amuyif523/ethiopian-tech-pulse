import React from 'react';

function LeaderboardItem({ item, index }) {
  return (
    <a 
      href={item.html_url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="flex items-center p-3 hover:bg-gray-700 rounded-md transition-colors duration-200"
    >
      <span className="text-lg font-bold text-gray-400 w-8">{index + 1}.</span>
      <img 
        src={item.avatar_url} 
        alt={item.login} 
        className="w-12 h-12 rounded-full mr-4 border-2 border-gray-600"
      />
      <div className="flex-1">
        <h3 className="text-md font-semibold text-white">{item.login}</h3>
        <p className="text-sm text-gray-400">View Profile</p>
      </div>
    </a>
  );
}

export default LeaderboardItem;