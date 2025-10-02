import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Reusable component for displaying key stats in a "glass card"
const StatCard = ({ icon, label, value }) => (
  <div className="glass-card p-4 rounded-lg flex items-center gap-4">
    <div className="text-green-400">{icon}</div>
    <div>
      <p className="text-sm text-gray-400">{label}</p>
      <p className="text-2xl font-bold text-white">{(value || 0).toLocaleString()}</p>
    </div>
  </div>
);

// Reusable component for displaying a single repository
const RepoCard = ({ repo }) => (
  <a 
    href={repo.html_url} 
    target="_blank" 
    rel="noopener noreferrer" 
    className="block p-4 rounded-lg transition-all duration-200 hover:bg-white/5 border border-white/10 h-full flex flex-col justify-between"
  >
    <div>
      <div className="flex justify-between items-start">
        <h3 className="text-md font-bold text-white truncate pr-4">{repo.name}</h3>
        <div className="flex-shrink-0 flex items-center gap-1 text-sm text-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-yellow-400"><path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.116 3.986 1.24 5.383c.294 1.282-.958 2.297-2.174 1.642l-4.79-2.684-4.79 2.684c-1.216.655-2.468-.36-2.174-1.642l1.24-5.383L1.64 10.955c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.007z" clipRule="evenodd" /></svg>
          <span>{repo.stargazers_count.toLocaleString()}</span>
        </div>
      </div>
      <p className="text-sm text-gray-400 mt-2 line-clamp-2">{repo.description || 'No description.'}</p>
    </div>
    {repo.language && <span className="inline-block mt-3 text-xs text-blue-300 bg-blue-500/10 px-2 py-1 rounded-full border border-blue-500/20">{repo.language}</span>}
  </a>
);

function ProfilePage({ username, onBack }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = import.meta.env.VITE_GITHUB_TOKEN;
        const headers = token ? { Authorization: `token ${token}` } : {};

        const userPromise = axios.get(`https://api.github.com/users/${username}`, { headers, signal: controller.signal });
        const reposPromise = axios.get(`https://api.github.com/users/${username}/repos?per_page=100`, { headers, signal: controller.signal });

        const [userResponse, reposResponse] = await Promise.all([userPromise, reposPromise]);
        
        const topRepos = (reposResponse.data || [])
            .sort((a, b) => b.stargazers_count - a.stargazers_count)
            .slice(0, 6);

        setProfile({
          details: userResponse.data,
          repos: topRepos,
        });

      } catch (err) {
        if (err.name !== 'CanceledError') {
          setError('Failed to load profile. The user may not exist.');
          console.error(err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => controller.abort();
  }, [username]);

  if (loading) {
    return <div className="text-center text-gray-400 p-8 animate-pulse">Loading Profile...</div>;
  }
  
  if (error) {
    return (
       <div className="container mx-auto p-4 md:p-8 text-white text-center">
         <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors duration-200 mb-8 mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Back to Dashboard
          </button>
         <p className="text-red-400">{error}</p>
       </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8 text-white">
      <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors duration-200 mb-8">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        Back to Dashboard
      </button>

      {profile && (
        <>
          <header className="flex flex-col md:flex-row items-center gap-8 mb-12">
            <img src={profile.details.avatar_url} alt={`${profile.details.login} avatar`} className="w-32 h-32 rounded-full ring-4 ring-green-400/50" />
            <div className="text-center md:text-left">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white">{profile.details.name}</h1>
              <h2 className="text-xl sm:text-2xl font-light text-gray-400">@{profile.details.login}</h2>
              <p className="text-gray-300 mt-4 max-w-xl">{profile.details.bio}</p>
              <a href={profile.details.html_url} target="_blank" rel="noopener noreferrer" className="inline-block mt-4 bg-green-400 text-gray-900 font-bold px-6 py-2 rounded-md hover:bg-green-300 transition-colors">
                View on GitHub
              </a>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <StatCard label="Followers" value={profile.details.followers} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>} />
            <StatCard label="Following" value={profile.details.following} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21v-1a6 6 0 00-1.78-4.125" /></svg>} />
            <StatCard label="Public Repos" value={profile.details.public_repos} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4" /></svg>} />
          </div>

          <div>
            <h3 className="text-2xl font-bold text-white mb-6">Top Repositories</h3>
            {profile.repos.length > 0 ? (
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {profile.repos.map(repo => <RepoCard key={repo.id} repo={repo} />)}
                </div>
            ) : (
                <p className="text-gray-400 glass-card rounded-lg p-6">This user doesn't have any public repositories yet.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default ProfilePage;

