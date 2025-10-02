    import React from 'react';

    // Hardcoded data for the weekly spotlight - easy to update!
    const spotlightData = {
        developer: {
            login: 'bayisagit',
            avatar_url: 'https://avatars.githubusercontent.com/u/44299449?v=4',
            html_url: 'https://github.com/bayisagit',
            reason: 'For consistent contributions to open-source and active engagement in the local tech community.'
        },
        repository: {
            full_name: 'andegna/calendar',
            html_url: 'https://github.com/andegna/calendar',
            description: 'If you ever want to convert Ethiopian Calendar to any other calendar system like the Gregorian Calendar this is the right package for you.',
            stargazers_count: 63,
            language: 'Java',
        }
    };

    const DevSpotlightCard = ({ dev, onSelect }) => (
        <div className="glass-card rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            <img src={dev.avatar_url} alt={dev.login} className="w-24 h-24 rounded-full ring-4 ring-green-400/50 flex-shrink-0" />
            <div>
                <p className="text-sm font-bold text-green-400 uppercase tracking-wider">Developer of the Week</p>
                <h3 className="text-2xl font-bold text-white mt-1">@{dev.login}</h3>
                <p className="text-gray-400 mt-3 text-sm">{dev.reason}</p>
                <button 
                    onClick={() => onSelect(dev.login)}
                    className="mt-4 bg-white/10 text-white font-semibold px-5 py-2 rounded-md hover:bg-white/20 transition-colors duration-200"
                >
                    View Profile
                </button>
            </div>
        </div>
    );

    const RepoSpotlightCard = ({ repo }) => (
        <div className="glass-card rounded-2xl p-6 flex flex-col justify-between">
            <div>
                <p className="text-sm font-bold text-green-400 uppercase tracking-wider">Repo of the Week</p>
                <h3 className="text-2xl font-bold text-white mt-1">{repo.full_name}</h3>
                <p className="text-gray-400 mt-3 text-sm line-clamp-2">{repo.description}</p>
            </div>
            <div className="mt-4 flex items-center justify-between">
                 <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="bg-white/10 text-white font-semibold px-5 py-2 rounded-md hover:bg-white/20 transition-colors duration-200">
                    View Repo
                </a>
                <div className="flex items-center gap-2 text-yellow-400 font-bold">
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.116 3.986 1.24 5.383c.294 1.282-.958 2.297-2.174 1.642l-4.79-2.684-4.79 2.684c-1.216.655-2.468-.36-2.174-1.642l1.24-5.383L1.64 10.955c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.007z" clipRule="evenodd" /></svg>
                    <span>{repo.stargazers_count.toLocaleString()}</span>
                </div>
            </div>
        </div>
    );


    function Spotlight({ onDeveloperSelect }) {
      return (
        <section className="mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <DevSpotlightCard dev={spotlightData.developer} onSelect={onDeveloperSelect} />
                <RepoSpotlightCard repo={spotlightData.repository} />
            </div>
        </section>
      );
    }

    export default Spotlight;
    
