    import React, { useState, useEffect } from 'react';
    import axios from 'axios';

    // We'll define the universities and their search terms here. This can be easily expanded.
    const universities = [
        { name: 'Addis Ababa Institute of Technology', acronym: 'AAiT', searchTerms: ['AAiT', '"Addis Ababa Institute of Technology"'] },
        { name: 'Adama Science & Technology University', acronym: 'ASTU', searchTerms: ['ASTU', '"Adama Science and Technology University"'] },
        { name: 'HiLCoE School of Computer Science', acronym: 'HiLCoE', searchTerms: ['HiLCoE', 'Hilcoe'] },
        { name: 'Bahir Dar University', acronym: 'BDU', searchTerms: ['BDU', '"Bahir Dar University"'] },
        { name: 'Jimma University', acronym: 'JU', searchTerms: ['JU', '"Jimma University"'] },
    ];

    const UniversityRow = ({ uni, rank }) => (
        <div className="flex items-center p-4 bg-white/5 rounded-lg transition-all duration-200 hover:bg-white/10 border border-transparent hover:border-white/10">
            <div className="w-12 flex-shrink-0 text-center text-2xl font-bold text-gray-400 group-hover:text-green-400">
                {rank + 1}
            </div>
            <div className="flex-1">
                <h3 className="text-lg font-bold text-white">{uni.acronym}</h3>
                <p className="text-sm text-gray-400 truncate">{uni.name}</p>
            </div>
            <div className="text-2xl font-extrabold text-white">
                {uni.count.toLocaleString()}
                <span className="text-sm font-semibold text-gray-500 ml-2">members</span>
            </div>
        </div>
    );


    function UniversityRankings() {
        const [rankings, setRankings] = useState([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);

        useEffect(() => {
            const controller = new AbortController();

            const fetchUniversityData = async () => {
                try {
                    setLoading(true);
                    setError(null);

                    const token = import.meta.env.VITE_GITHUB_TOKEN;
                    const headers = token ? { Authorization: `token ${token}` } : {};

                    const promises = universities.map(async (uni) => {
                        const query = `q=${uni.searchTerms.join('+OR+')} in:bio location:ethiopia type:user`;
                        const apiUrl = `https://api.github.com/search/users?${query}&per_page=1`; // We only need the total_count, not the items
                        
                        const response = await axios.get(apiUrl, { headers, signal: controller.signal });
                        return { 
                            name: uni.name, 
                            acronym: uni.acronym, 
                            count: response.data.total_count || 0 
                        };
                    });

                    const results = await Promise.all(promises);
                    const sortedResults = results.sort((a, b) => b.count - a.count);
                    
                    setRankings(sortedResults);

                } catch (err) {
                    if (err.name !== 'CanceledError') {
                        setError('Failed to load university rankings.');
                        console.error(err);
                    }
                } finally {
                    setLoading(false);
                }
            };

            fetchUniversityData();
            return () => controller.abort();
        }, []);


        let content;
        if(loading) {
            content = <p className="text-center text-gray-400 animate-pulse p-4">Ranking universities...</p>;
        } else if (error) {
            content = <p className="text-center text-red-400 p-4">{error}</p>;
        } else {
            content = (
                <div className="space-y-4">
                    {rankings.map((uni, index) => <UniversityRow key={uni.name} uni={uni} rank={index} />)}
                </div>
            )
        }

        return (
            <section className="glass-card rounded-2xl p-6">
                <h2 className="text-2xl font-bold text-white mb-6">University & Bootcamp Rankings</h2>
                {content}
            </section>
        );
    }

    export default UniversityRankings;
    
