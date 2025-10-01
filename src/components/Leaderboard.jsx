import React from 'react';

// This component accepts `title` as a prop.
function Leaderboard({ title }) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-white mb-4">{title}</h2>
      {/* We will add the list of items here in a future milestone */}
      <div className="text-gray-400">
        <p>Leaderboard content coming soon...</p>
      </div>
    </div>
  );
}

export default Leaderboard;