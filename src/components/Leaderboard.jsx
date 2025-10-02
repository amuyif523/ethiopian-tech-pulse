import React, { useState, useEffect } from "react";
import axios from "axios";
import LeaderboardItem from "./LeaderboardItem";
import RepoItem from "./RepoItem";
import LanguageChart from "./LanguageChart";

// Helper to select an icon based on the title
const CardIcon = ({ title }) => {
  let icon;
  switch (title) {
    case 'Top Developers':
      icon = <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
      break;
    case 'Top Repositories':
      icon = <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4" /></svg>;
      break;
    case 'Top Languages':
      icon = <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /><path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" /></svg>;
      break;
    default:
      icon = null;
  }
  return <div className="flex-shrink-0">{icon}</div>;
};

// The new Time Filter component
const TimeFilter = ({ filter, setFilter }) => (
  <div className="flex items-center bg-white/5 p-1 rounded-md text-sm">
    <button
      onClick={() => setFilter('weekly')}
      className={`px-3 py-1 rounded transition-colors duration-200 ${
        filter === 'weekly' ? 'bg-green-400 text-gray-900 font-semibold' : 'text-gray-400 hover:bg-white/10'
      }`}
    >
      Weekly
    </button>
    <button
      onClick={() => setFilter('all-time')}
      className={`px-3 py-1 rounded transition-colors duration-200 ${
        filter === 'all-time' ? 'bg-green-400 text-gray-900 font-semibold' : 'text-gray-400 hover:bg-white/10'
      }`}
    >
      All-Time
    </button>
  </div>
);

function Leaderboard({ title }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all-time'); // New state for the time filter

  useEffect(() => {
    if (title === "Top Languages") {
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    const fetchData = async () => {
      let baseUrl = "";
      let sortParam = "";
      let dateFilter = "";

      // Calculate the date for 7 days ago
      if (filter === 'weekly') {
        const date = new Date();
        date.setDate(date.getDate() - 7);
        const dateString = date.toISOString().split('T')[0];
        // For new repos/devs, we filter by creation date.
        // For trending, you'd sort by stars gained in a week, which needs a backend.
        dateFilter = `+created:>=${dateString}`;
      }

      if (title === "Top Developers") {
        baseUrl = "https://api.github.com/search/users?q=location:ethiopia";
        sortParam = "&sort=followers&order=desc";
      } else if (title === "Top Repositories") {
        baseUrl = "https://api.github.com/search/repositories?q=ethiopia+in:name,description,topics";
        sortParam = "&sort=stars&order=desc";
      }
      
      const apiUrl = `${baseUrl}${dateFilter}${sortParam}&per_page=10`;

      try {
        setLoading(true);
        setError(null);
        const token = import.meta.env.VITE_GITHUB_TOKEN;
        const headers = token ? { Authorization: `token ${token}` } : {};
        
        const response = await axios.get(apiUrl, {
          headers,
          signal: controller.signal,
        });
        setItems(response.data.items || []);
      } catch (err) {
        if (err.name !== "CanceledError") {
          setError("Failed to fetch data.");
          console.error(`Error fetching from ${apiUrl}:`, err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => controller.abort();
  }, [title, filter]); // Re-run effect when filter changes!

  let content;
  if (loading) {
    content = <p className="text-center text-gray-400 animate-pulse p-4">Loading data...</p>;
  } else if (error) {
    content = <p className="text-center text-red-400 p-4">{error}</p>;
  } else if (title === "Top Languages") {
    content = <LanguageChart />;
  } else {
    const listItems = items.length > 0 ? (
      items.map((item, index) =>
        title === "Top Developers" ? (
          <LeaderboardItem key={item.id} item={item} index={index} />
        ) : (
          <RepoItem key={item.id} item={item} index={index} />
        )
      )
    ) : (
      <p className="text-center text-gray-400 p-4">No {title.toLowerCase()} found for this period.</p>
    );
    content = <div className="space-y-2">{listItems}</div>;
  }

  return (
    <section className="glass-card rounded-2xl shadow-2xl h-[640px] flex flex-col">
      <header className="flex items-center justify-between gap-4 p-5 border-b border-white/10">
        <div className="flex items-center gap-4">
          <CardIcon title={title} />
          <h2 className="text-xl font-bold text-white tracking-wide">{title}</h2>
        </div>
        {title !== 'Top Languages' && <TimeFilter filter={filter} setFilter={setFilter} />}
      </header>
      <div className="flex-grow min-h-0 overflow-hidden">
        <div className="h-full overflow-y-auto custom-scrollbar p-3">
          {content}
        </div>
      </div>
    </section>
  );
}

export default Leaderboard;
