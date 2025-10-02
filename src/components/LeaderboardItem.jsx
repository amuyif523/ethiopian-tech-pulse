import React, { useState } from 'react';
import Badge from './Badge'; // Import the new Badge component
import { getDeveloperBadge } from '../utils/badgeLogic'; // Import the badge logic

// Share Icon
const ShareIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.368a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
    </svg>
);

// Checkmark Icon for "Copied!" feedback
const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);


function LeaderboardItem({ item, index, onSelect, timeFilter }) {
    const [copied, setCopied] = useState(false);
    const badge = getDeveloperBadge(item); // Check for a badge

    const handleShare = async (e) => {
        e.stopPropagation(); // Prevent navigating to profile page

        const timeText = timeFilter === 'weekly' ? 'this week' : 'of all time';
        const shareText = `I'm ranked #${index + 1} on the Ethiopian Tech Pulse leaderboard for top developers ${timeText}! 🏆`;
        const shareUrl = "https://ethiopiantechpulse.com"; // Replace with your actual deployed URL later

        const shareData = {
            title: 'Ethiopian Tech Pulse',
            text: shareText,
            url: shareUrl,
        };

        try {
            // Use the Web Share API if available
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                throw new Error('Web Share API not supported.');
            }
        } catch { // The 'err' variable is removed here
            // Fallback to clipboard if Web Share API fails or is not supported
            navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
        }
    };

    return (
        <div className="group flex items-center gap-4 p-3 rounded-lg transition-all duration-200 hover:bg-white/5 w-full">
            <button
                onClick={() => onSelect(item.login)}
                className="flex flex-1 items-center gap-4 text-left"
                aria-label={`View profile for ${item.login}`}
            >
                <div className="w-8 flex-shrink-0 text-center text-lg font-bold text-gray-400 group-hover:text-green-400">
                    {index + 1}
                </div>

                <img
                    src={item.avatar_url}
                    alt={`${item.login}'s avatar`}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-white/10"
                    loading="lazy"
                />

                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                        <h3 className="text-md font-semibold text-white truncate">{item.login}</h3>
                        {/* Conditionally render the badge if it exists */}
                        {badge && <Badge badge={badge} />}
                    </div>
                    <p className="text-sm text-gray-400">View Profile</p>
                </div>
            </button>

            <button 
                onClick={handleShare}
                className={`flex-shrink-0 transition-all duration-200 text-gray-400 hover:text-green-400 p-2 rounded-full hover:bg-white/10 ${copied ? 'bg-green-500/20 text-green-400' : ''}`}
                aria-label="Share rank"
            >
                {copied ? <CheckIcon /> : <ShareIcon />}
            </button>
        </div>
    );
}

export default LeaderboardItem;

