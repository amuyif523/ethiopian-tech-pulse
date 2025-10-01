import React from 'react';
import Header from './components/Header';
import Leaderboard from './components/Leaderboard';
import LanguageChart from './components/LanguageChart';

function App() {
  return (
    <div className="bg-gray-900 min-h-screen text-white font-sans">
      <Header />
      <main className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Developer Leaderboard */}
          <div className="md:col-span-1">
            <Leaderboard title="Top Developers" />
          </div>

          {/* Repository Leaderboard */}
          <div className="md:col-span-1">
            <Leaderboard title="Top Repositories" />
          </div>

          {/* Language Chart */}
          <div className="md:col-span-1">
            <LanguageChart />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
