import React, { useState } from 'react';
import Header from './components/Header';
import Leaderboard from './components/Leaderboard';
import ProfilePage from './components/ProfilePage';

// The Dashboard view component is extracted for clarity
const Dashboard = ({ onDeveloperSelect }) => (
  <main className="container mx-auto p-4 md:p-8">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <Leaderboard title="Top Developers" onDeveloperSelect={onDeveloperSelect} />
      <Leaderboard title="Top Repositories" />
      <Leaderboard title="Top Languages" />
    </div>
  </main>
);

function App() {
  // State to manage the current view ('dashboard' or 'profile') and selected data
  const [view, setView] = useState({ page: 'dashboard', data: null });

  // Function to navigate to a developer's profile page
  const handleSelectDeveloper = (username) => {
    setView({ page: 'profile', data: username });
    window.scrollTo(0, 0); // Scroll to top on navigation
  };

  // Function to navigate back to the main dashboard
  const handleBackToDashboard = () => {
    setView({ page: 'dashboard', data: null });
  };

  return (
    <div className="min-h-screen text-gray-200">
      <Header />
      
      {/* Conditionally render the correct view based on the current state */}
      {view.page === 'dashboard' ? (
        <Dashboard onDeveloperSelect={handleSelectDeveloper} />
      ) : (
        <ProfilePage username={view.data} onBack={handleBackToDashboard} />
      )}
    </div>
  );
}

export default App;

