// components/GenreChart.tsx

import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface GenreChartProps {
  genres: { [genre: string]: number };
}

const GenreChart: React.FC<GenreChartProps> = ({ genres }) => {
  const sortedGenres = Object.entries(genres)
    .sort(([, countA], [, countB]) => countB - countA)
    .slice(0, 20);

  const data = {
    labels: sortedGenres.map(([genre]) => genre),
    datasets: [
      {
        label: 'Genre Count',
        data: sortedGenres.map(([, count]) => count),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Top 20 Genres',
      },
    },
    scales: {
      x: {
        ticks: {
          autoSkip: false,
          maxRotation: 90,
          minRotation: 90,
        },
        grid: {
          display: false, // Disable grid lines on the x-axis
        },
      },
      y: {
        grid: {
          display: false, // Disable grid lines on the y-axis
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default GenreChart;
