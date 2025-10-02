import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// We must register the components we need from Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function LanguageChart() {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchAndProcessData = async () => {
      try {
        setLoading(true);
        setError(null);
        const token = import.meta.env.VITE_GITHUB_TOKEN;
        const headers = token ? { Authorization: `token ${token}` } : {};

        const response = await axios.get(
          'https://api.github.com/search/repositories?q=ethiopia+in:name,description,topics&sort=stars&order=desc&per_page=100',
          { headers, signal: controller.signal }
        );

        const repos = response.data.items || [];
        if (!repos.length) {
          setChartData({ labels: [], datasets: [] });
          return;
        }

        const languageCounts = repos.reduce((acc, repo) => {
          const lang = repo.language;
          if (lang && lang !== 'HTML' && lang !== 'CSS') { // Filter out common markup languages
            acc[lang] = (acc[lang] || 0) + 1;
          }
          return acc;
        }, {});

        const sortedLanguages = Object.entries(languageCounts)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 7);

        setChartData({
          labels: sortedLanguages.map(([lang]) => lang),
          datasets: [
            {
              label: 'Repositories',
              data: sortedLanguages.map(([, count]) => count),
              backgroundColor: [
                '#34D399', '#3B82F6', '#F59E0B', '#EF4444',
                '#8B5CF6', '#10B981', '#EC4899',
              ],
              borderRadius: 4,
              borderSkipped: false,
            },
          ],
        });
      } catch (err) {
        if (err.name !== 'CanceledError') {
          setError('Failed to fetch language data.');
          console.error(err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAndProcessData();
    return () => controller.abort();
  }, []);

  // Meticulously styled chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: false },
      tooltip: {
        backgroundColor: '#111827',
        titleColor: '#E5E7EB',
        bodyColor: '#D1D5DB',
        padding: 10,
        cornerRadius: 4,
        displayColors: false,
      },
    },
    scales: {
      x: {
        ticks: { color: '#9CA3AF' },
        grid: { display: false },
        border: { color: 'rgba(255, 255, 255, 0.1)' },
      },
      y: {
        ticks: { color: '#9CA3AF', precision: 0 },
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        border: { display: false },
      },
    },
  };

  if (loading) return <p className="text-center text-gray-400 animate-pulse p-4">Analyzing data...</p>;
  if (error) return <p className="text-center text-red-400 p-4">{error}</p>;
  if (!chartData || !chartData.labels?.length)
    return <p className="text-center text-gray-400 p-4">Not enough data to build a chart.</p>;

  return (
    <div className="w-full h-full p-2">
      <Bar options={options} data={chartData} />
    </div>
  );
}

export default LanguageChart;