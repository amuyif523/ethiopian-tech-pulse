    import React, { useState, useEffect } from 'react';
    import axios from 'axios';
    
    // A simple icon to represent a trend
    const TrendIcon = () => (
        <svg xmlns="http://www.w.org/2000/svg" className="h-8 w-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
    );
    
    function TrendingLanguage() {
        const [trend, setTrend] = useState(null);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);
    
        useEffect(() => {
            const controller = new AbortController();
    
            const getLanguageCounts = async (startDate, endDate) => {
                const token = import.meta.env.VITE_GITHUB_TOKEN;
                const headers = token ? { Authorization: `token ${token}` } : {};
                const query = `q=ethiopia+in:name,description,topics+created:${startDate}..${endDate}`;
                const apiUrl = `https://api.github.com/search/repositories?${query}&per_page=100`;
                
                const response = await axios.get(apiUrl, { headers, signal: controller.signal });
                const repos = response.data.items || [];
    
                return repos.reduce((acc, repo) => {
                    const lang = repo.language;
                    if (lang && lang !== 'HTML' && lang !== 'CSS') {
                        acc[lang] = (acc[lang] || 0) + 1;
                    }
                    return acc;
                }, {});
            };
    
            const calculateTrend = async () => {
                try {
                    setLoading(true);
                    setError(null);
    
                    const today = new Date();
                    const thirtyDaysAgo = new Date(new Date().setDate(today.getDate() - 30));
                    const sixtyDaysAgo = new Date(new Date().setDate(today.getDate() - 60));
    
                    const recentPromise = getLanguageCounts(thirtyDaysAgo.toISOString().split('T')[0], today.toISOString().split('T')[0]);
                    const previousPromise = getLanguageCounts(sixtyDaysAgo.toISOString().split('T')[0], thirtyDaysAgo.toISOString().split('T')[0]);
    
                    const [recentCounts, previousCounts] = await Promise.all([recentPromise, previousPromise]);
    
                    const growth = {};
                    for (const lang in recentCounts) {
                        growth[lang] = recentCounts[lang] - (previousCounts[lang] || 0);
                    }
    
                    const sortedGrowth = Object.entries(growth).sort(([, a], [, b]) => b - a);
    
                    if (sortedGrowth.length > 0) {
                        setTrend({
                            language: sortedGrowth[0][0],
                            growth: sortedGrowth[0][1]
                        });
                    } else {
                         setTrend(null); // No trend found
                    }
    
                } catch (err) {
                    if (err.name !== 'CanceledError') {
                        setError('Could not calculate language trends.');
                        console.error(err);
                    }
                } finally {
                    setLoading(false);
                }
            };
    
            calculateTrend();
            return () => controller.abort();
        }, []);
    
        if (loading) {
            return (
                <div className="glass-card rounded-2xl p-6 text-center text-gray-400 animate-pulse">
                    Calculating language trends...
                </div>
            );
        }
    
        if (error) {
            return null; // Don't show the component if there's an error
        }
    
        if (!trend || trend.growth <= 0) {
            return (
                 <div className="glass-card rounded-2xl p-6 text-center">
                    <p className="text-gray-400">No significant language trends this month.</p>
                </div>
            )
        }
    
        return (
            <div className="glass-card rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                <TrendIcon />
                <div>
                    <p className="text-sm font-bold text-green-400 uppercase tracking-wider">Trending Language</p>
                    <p className="text-2xl font-bold text-white mt-1">
                        {trend.language}
                        <span className="text-lg font-medium text-gray-400 ml-2">
                           is growing fast with +{trend.growth} new projects this month.
                        </span>
                    </p>
                </div>
            </div>
        );
    }
    
    export default TrendingLanguage;
    
