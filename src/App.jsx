import React from 'react';
import Header from './components/Header';
import Leaderboard from './components/Leaderboard';

function App() {
  return (
    <div className="min-h-screen text-gray-200">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Leaderboard title="Top Developers" />
          <Leaderboard title="Top Repositories" />
          <Leaderboard title="Top Languages" />
        </div>
      </main>
    </div>
  );
}

export default App;