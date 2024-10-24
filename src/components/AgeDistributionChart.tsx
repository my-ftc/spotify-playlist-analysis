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
        title: {
          display: true, // Display the title
          text: 'Number of tracks', // Set the title text
          color: '#000', // Set the title color (optional)
          font: {
            size: 14, // Set font size for the title (optional)
            family: 'Arial', // Set font family (optional)
          },
        },
      },
    },
  };

  return (
    <div className='bg-white shadow-lg rounded-lg p-4 mt-5'>
      <div className="flex items-center">
        <h2 className='font-bold text-black'>Track Age Analysis</h2>

        <div className="flex items-center bg-[#eefaf0] px-2 py-1 rounded-lg ml-4">
          <img src="/images/safe-logo.png" alt="Safe Icon" className="w-4 h-5 mr-2" />
          <span className="text-[#0a0f26] font-semibold">Safe</span>
        </div>

        <img
          src="/images/info.png"
          alt="Info Icon"
          className="w-4 h-4 ml-4 cursor-pointer"
        />
      </div>
      <p className='my-4'>Lorem ipsum dolor sit amet consectetur. Gravida in egestas donec viverra a porttitor sit sed.</p>
      <Bar data={data} options={options} />
    </div>
  );
};

export default AgeDistributionChart;
