import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LeaderboardItem from './LeaderboardItem';

function Leaderboard({ title }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (title !== 'Top Developers') {
      setLoading(false);
      return;
    }

    const fetchDevelopers = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          'https://api.github.com/search/users?q=location:ethiopia&sort=followers&order=desc&per_page=10',
          {
            headers: {
              Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
            },
          }
        );
        setItems(response.data.items);
        setError(null);
      } catch (err) {
        setError('Failed to fetch data. Please check your API token and network.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDevelopers();
  }, [title]);

  let content;
  if (loading) {
    content = <p className="text-gray-400">Loading...</p>;
  } else if (error) {
    content = <p className="text-red-400">{error}</p>;
  } else if (title !== 'Top Developers') {
    content = <p className="text-gray-400">Leaderboard content coming soon...</p>;
  } else {
    content = (
      <div className="space-y-2">
        {Array.isArray(items) && items.length > 0 ? (
          items.map((item, index) => (
            <LeaderboardItem key={item.id} item={item} index={index} />
          ))
        ) : (
          <p className="text-gray-400">No developers found.</p>
        )}
      </div>
    );
  }

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg h-full">
      <h2 className="text-2xl font-semibold text-white mb-4">{title}</h2>
      {content}
    </div>
  );
}

export default Leaderboard;
