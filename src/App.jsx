import React, { useState } from 'react';
import Header from './components/Header';
import Leaderboard from './components/Leaderboard';
import ProfilePage from './components/ProfilePage';
import Spotlight from './components/Spotlight';
import TrendingLanguage from './components/TrendingLanguage';
import UniversityRankings from './components/UniversityRankings';
import HackathonPage from './components/HackathonPage';
import OnboardingGuide from './components/OnboardingGuide';
import DigestSignUp from './components/DigestSignUp'; // Import the new component

// The Dashboard view component, which lays out all the main sections
const Dashboard = ({ onDeveloperSelect }) => (
  <main className="container mx-auto p-4 md:p-8">
    <Spotlight onDeveloperSelect={onDeveloperSelect} />

    <div className="my-8">
      <TrendingLanguage />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <Leaderboard title="Top Developers" onDeveloperSelect={onDeveloperSelect} />
      <Leaderboard title="Top Repositories" />
      <Leaderboard title="Top Languages" />
    </div>

    <div className="mt-8">
      <UniversityRankings />
    </div>

    {/* Render the Digest Sign-Up section here */}
    <div className="mt-8">
      <DigestSignUp />
    </div>
  </main>
);

function App() {
  // State to manage the current view and any associated data
  const [view, setView] = useState({ page: 'dashboard', data: null });

  // A generic navigation function to switch between the main pages
  const handleNavigate = (page, data = null) => {
    setView({ page, data });
    window.scrollTo(0, 0); // Ensures user starts at the top of the new page
  };
  
  // A specific handler for navigating to a developer profile
  const handleSelectDeveloper = (username) => {
    handleNavigate('profile', username);
  };

  // A specific handler for returning to the main dashboard from any other page
  const handleBackToDashboard = () => {
    handleNavigate('dashboard');
  };

  // A helper function to render the correct page component based on the current view state
  const renderCurrentView = () => {
    switch (view.page) {
      case 'profile':
        return <ProfilePage username={view.data} onBack={handleBackToDashboard} />;
      case 'hackathon':
        return <HackathonPage onBack={handleBackToDashboard} />;
      case 'guide':
        return <OnboardingGuide onBack={handleBackToDashboard} />;
      case 'dashboard':
      default:
        return <Dashboard onDeveloperSelect={handleSelectDeveloper} />;
    }
  };

  return (
    <div className="min-h-screen text-gray-200">
      <Header onNavigate={handleNavigate} />
      {renderCurrentView()}
    </div>
  );
}

export default App;

