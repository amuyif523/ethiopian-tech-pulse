import React from 'react';

const GuideSection = ({ title, children }) => (
    <div className="mb-10">
        <h2 className="text-2xl font-bold text-green-400 border-b-2 border-green-400/20 pb-2 mb-4">{title}</h2>
        <div className="prose prose-invert prose-lg max-w-none text-gray-300">
            {children}
        </div>
    </div>
);

const ExternalLink = ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-green-400 font-semibold hover:underline">
        {children}
    </a>
);

function OnboardingGuide({ onBack }) {
  return (
    <div className="container mx-auto p-4 md:p-8 text-white">
        <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors duration-200 mb-8">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Back to Dashboard
        </button>
        
        <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-extrabold text-white text-center mb-4">Your Journey into Open Source Starts Here</h1>
            <p className="text-xl text-gray-400 text-center mb-12">A guide for Ethiopian students and new developers to get started with GitHub.</p>

            <GuideSection title="1. What are Git & GitHub?">
                <p>Think of Git as a "save" button for your code, but much more powerful. It lets you track every change you make. GitHub is a website that hosts your Git projects online. It's a place to store your code, collaborate with others, and show your work to the world. It’s your developer resume!</p>
            </GuideSection>
            
            <GuideSection title="2. Creating Your Professional Profile">
                <p>Your GitHub profile is your professional identity. Make it count!</p>
                <ul>
                    <li><strong>Profile Picture:</strong> Use a clear, professional photo of yourself.</li>
                    <li><strong>Name & Bio:</strong> Use your real name and write a short bio. Mention your school (e.g., "Student at AAiT") and your interests (e.g., "Aspiring Mobile Developer").</li>
                    <li><strong>Location:</strong> Set your location to "Ethiopia" to appear on this leaderboard!</li>
                </ul>
                <ExternalLink href="https://github.com/settings/profile">Complete Your Profile Now</ExternalLink>
            </GuideSection>

            <GuideSection title="3. Your First Project: Pinning Your Best Work">
                <p>Even if you're a beginner, you can start a project. Create a "repository" for a simple school project or even just a document introducing yourself. The most important step is to "pin" your best projects to your profile. This is the first thing recruiters and collaborators will see.</p>
            </GuideSection>
            
             <GuideSection title="4. How to Contribute & Get Noticed">
                <p>The best way to get noticed is to contribute to open-source projects.</p>
                <ul>
                    <li><strong>Find Ethiopian Projects:</strong> Explore the "Top Repositories" on this dashboard! Many local projects need help with documentation, fixing small bugs, or testing.</li>
                    <li><strong>Fix a Typo:</strong> The easiest first contribution is often fixing a typo in a project's README file. It's a simple way to learn the workflow.</li>
                    <li><strong>Be Consistent:</strong> The green squares on your GitHub profile show your activity. Even a small contribution each week shows you are active and passionate. Keep your streak going!</li>
                </ul>
            </GuideSection>
        </div>
    </div>
  );
}

export default OnboardingGuide;

