import React from 'react';

function Header() {
  return (
    <header className="bg-gray-800 p-4 shadow-md mb-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-green-400">
          Ethiopian Tech Pulse
        </h1>
        <p className="text-gray-400">
          Tracking the GitHub heartbeat of the Ethiopian developer community.
        </p>
      </div>
    </header>
  );
}

export default Header;