// Heuristics for awarding badges. These can be fine-tuned.

/**
 * A "Rising Star" is a developer who joined GitHub recently.
 * This identifies new talent in the community.
 * @param {object} user - The user object from the GitHub API.
 * @returns {object|null} - The badge object or null.
 */
export function getDeveloperBadge(user) {
    // Check if the created_at property exists
    if (!user || !user.created_at) {
        return null;
    }

    const accountCreatedDate = new Date(user.created_at);
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    if (accountCreatedDate > sixMonthsAgo) {
        return { type: 'Rising Star', label: 'Joined in the last 6 months' };
    }
    return null;
}

/**
 * A "Trending Project" is a repository that was created recently
 * and has already gained a significant number of stars.
 * @param {object} repo - The repository object from the GitHub API.
 * @returns {object|null} - The badge object or null.
 */
export function getRepoBadge(repo) {
    // Check if the necessary properties exist
    if (!repo || !repo.created_at || repo.stargazers_count === undefined) {
        return null;
    }
    
    const repoCreatedDate = new Date(repo.created_at);
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

    // Award badge if created in the last 3 months and has more than 20 stars
    if (repoCreatedDate > threeMonthsAgo && repo.stargazers_count > 20) {
        return { type: 'Trending Project', label: 'High momentum' };
    }
    return null;
}

