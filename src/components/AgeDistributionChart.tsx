// components/AgeDistributionChart.tsx

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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface AgeDistributionChartProps {
  ageDistribution: { [ageGroup: string]: number };
}

const AgeDistributionChart: React.FC<AgeDistributionChartProps> = ({ ageDistribution }) => {
  const data = {
    labels: Object.keys(ageDistribution),
    datasets: [
      {
        label: 'Number of Tracks',
        data: Object.values(ageDistribution),
        backgroundColor: 'rgba(29, 74, 93)', // Default bar color
        hoverBackgroundColor: 'rgba(7, 45, 61)', // Color on hover
        borderRadius: 5, // Makes the top of the bars rounded
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
      title: {
        display: false, // Hide the default title
      },
    },
    scales: {
      x: {
        grid: {
          color: '#f6f6fb', // Set the grid color for x-axis
        },
        border: {
          color: '#f6f6fb', // Set the border color for x-axis
        },
      },
      y: {
        grid: {
          color: '#f6f6fb', // Set the grid color for y-axis
        },
        beginAtZero: true, // Ensures y-axis starts from zero
        border: {
          color: '#f6f6fb', // Set the border color for y-axis
        },
      },
    },
  };

  return (
    <div className='bg-white shadow-lg rounded-lg p-4 mt-5'>
      <h2 className='mb-2 font-bold text-black'>Track Age Analysis</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default AgeDistributionChart;
