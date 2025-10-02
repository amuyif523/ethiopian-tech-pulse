import React, { useState } from 'react';

const MailIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);

const CheckCircleIcon = () => (
     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

function DigestSignUp() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle | submitting | success | error

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !email.includes('@')) {
            setStatus('error');
            return;
        }
        setStatus('submitting');
        // Simulate API call
        setTimeout(() => {
            setStatus('success');
        }, 1500);
    };

    if (status === 'success') {
        return (
            <div className="glass-card rounded-2xl p-8 text-center flex flex-col items-center justify-center">
                 <div className="text-green-400">
                    <CheckCircleIcon />
                </div>
                <h3 className="text-2xl font-bold text-white mt-4">You're on the list!</h3>
                <p className="text-gray-400 mt-2">Thanks for subscribing. Keep an eye on your inbox for the first weekly digest.</p>
            </div>
        )
    }

    return (
        <section className="glass-card rounded-2xl p-8">
            <div className="flex flex-col lg:flex-row items-center gap-8">
                <div className="flex-shrink-0 text-green-400">
                    <MailIcon />
                </div>
                <div className="flex-1 text-center lg:text-left">
                    <h2 className="text-2xl font-bold text-white">Get the Weekly Digest</h2>
                    <p className="text-gray-400 mt-2">
                        Stay ahead of the curve. Get the top developers, repositories, and language trends delivered to your inbox or Telegram every week.
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="w-full lg:w-auto flex-shrink-0">
                    <div className="flex flex-col sm:flex-row gap-3">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="w-full flex-grow bg-white/5 border border-white/10 rounded-md px-4 py-2 text-white placeholder-gray-500 focus:ring-2 focus:ring-green-400 focus:outline-none transition-shadow"
                            required
                        />
                        <button 
                            type="submit"
                            disabled={status === 'submitting'}
                            className="bg-green-400 text-gray-900 font-bold px-6 py-2 rounded-md hover:bg-green-300 transition-colors duration-200 disabled:bg-gray-500 disabled:cursor-not-allowed"
                        >
                            {status === 'submitting' ? 'Subscribing...' : 'Subscribe'}
                        </button>
                    </div>
                     {status === 'error' && <p className="text-red-400 text-sm mt-2">Please enter a valid email address.</p>}
                </form>
            </div>
        </section>
    );
}

export default DigestSignUp;

