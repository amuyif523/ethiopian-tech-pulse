    import React, { useState, useEffect } from 'react';
    import axios from 'axios';
    import RepoItem from './RepoItem'; // We can reuse our beautifully designed RepoItem!

    // Configuration for the hackathon
    const HACKATHON_TOPIC = 'ethiopian-pulse-hackathon-2025'; // A unique topic for the event

    function HackathonPage({ onBack }) {
        const [projects, setProjects] = useState([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);

        useEffect(() => {
            const controller = new AbortController();

            const fetchHackathonData = async () => {
                // Don't show loader on subsequent polls, only on initial load
                if (!projects.length) setLoading(true);
                setError(null);

                try {
                    const token = import.meta.env.VITE_GITHUB_TOKEN;
                    const headers = token ? { Authorization: `token ${token}` } : {};
                    
                    // The API query is scoped to our unique hackathon topic and sorted by recent updates
                    const apiUrl = `https://api.github.com/search/repositories?q=topic:${HACKATHON_TOPIC}&sort=updated&order=desc`;

                    const response = await axios.get(apiUrl, { headers, signal: controller.signal });
                    setProjects(response.data.items || []);

                } catch (err) {
                    if (err.name !== 'CanceledError') {
                        setError('Failed to load hackathon data. Is the topic correct?');
                        console.error(err);
                    }
                } finally {
                    setLoading(false);
                }
            };

            fetchHackathonData(); // Fetch immediately on load

            // Set up polling to refresh data every 30 seconds
            const intervalId = setInterval(fetchHackathonData, 30000);

            // Cleanup function to clear the interval and cancel any pending requests
            return () => {
                clearInterval(intervalId);
                controller.abort();
            };
        }, []); // Empty dependency array ensures this runs only once on mount

        let content;
        if (loading) {
            content = <p className="text-center text-gray-400 animate-pulse p-4">Fetching live project data...</p>;
        } else if (error) {
            content = <p className="text-center text-red-400 p-4">{error}</p>;
        } else if (projects.length === 0) {
            content = (
                <div className="text-center text-gray-400 p-8 glass-card rounded-lg">
                    <h3 className="text-xl font-bold text-white">Waiting for Projects...</h3>
                    <p className="mt-2">No projects with the topic <code className="bg-white/10 px-2 py-1 rounded text-green-400">{HACKATHON_TOPIC}</code> found yet.</p>
                </div>
            )
        } else {
            content = (
                <div className="space-y-4">
                    {projects.map((repo, index) => (
                        // We are reusing the RepoItem here, but we could create a custom one!
                        <RepoItem key={repo.id} item={repo} index={index} />
                    ))}
                </div>
            )
        }

        return (
            <div className="container mx-auto p-4 md:p-8 text-white">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-extrabold text-white">Hackathon Live Feed</h1>
                        <p className="text-gray-400 mt-1">Projects are ranked by the most recent commit. Updates every 30 seconds.</p>
                    </div>
                     <button onClick={onBack} className="flex-shrink-0 flex items-center gap-2 bg-white/10 px-4 py-2 rounded-md text-gray-300 hover:text-white hover:bg-white/20 transition-colors duration-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                        Exit Hackathon Mode
                    </button>
                </div>
                {content}
            </div>
        );
    }

    export default HackathonPage;