import { Bar } from 'react-chartjs-2';
import CustomTooltip from './Tooltip';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Legend,
  Tooltip,
  ChartOptions,
} from 'chart.js';
import { useState } from 'react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Legend, Tooltip);

interface AgeDistributionChartProps {
  ageDistribution: { [ageGroup: string]: number };
}

const AgeDistributionChart: React.FC<AgeDistributionChartProps> = ({ ageDistribution }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null); // Track the active hover index

  const data = {
    labels: Object.keys(ageDistribution),
    datasets: [
      {
        label: 'Number of Tracks',
        data: Object.values(ageDistribution),
        backgroundColor: 'rgba(29, 74, 93)', // Default bar color
        hoverBackgroundColor: 'rgba(7, 45, 61)', // Color on hover
        borderRadius: 5, // Makes the top of the bars rounded
        barThickness: 80,
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false, // Disable aspect ratio to allow custom height
    onHover: (event, elements) => {
      if (elements.length > 0) {
        setActiveIndex(elements[0].index); // Set the index of the hovered bar
      } else {
        setActiveIndex(null); // Reset the index when not hovering
      }
    },
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
        ticks: {
          color: '#636588', // Set tick color for x-axis
          font: (context: any) => {
            const isActive = context.index === activeIndex; // Check if this label is hovered
            return {
              family: 'Poppins', // Use Poppins font
              weight: isActive ? 'bold' : 'normal', // Make the font bold if hovered
            };
          },
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
        ticks: {
          color: '#636588', // Set tick color for y-axis
          font: {
            family: 'Poppins', // Use Poppins font
          },
        },
        border: {
          color: '#f6f6fb', // Set the border color for y-axis
        },
        title: {
          display: true, // Display the title
          text: 'Number of tracks', // Set the title text
          color: '#000', // Set the title color (optional)
          font: {
            size: 14, // Set font size for the title (optional)
            family: 'Arial', // Set font family for the title (optional)
          },
        },
      },
    },
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 mt-5 h-[60vh]">
      <div className="flex items-center mt-3">
        <h2 className='font-bold text-black'>Track Age Analysis</h2>

        <div className="flex items-center bg-[#eefaf0] px-2 py-1 rounded-lg ml-4">
          <img src="/images/safe-logo.png" alt="Safe Icon" className="w-4 h-5 mr-2" />
          <span className="text-[#0a0f26] font-semibold">Safe</span>
        </div>

        <div className="relative group ml-4 flex items-center">
          <CustomTooltip title="Lorem ipsum dolor sit amet consectetur. Gravida in egestas donec viverra a porttitor sit sed.">
            <img
              src="/images/info.png"
              alt="Info Icon"
              className="w-4 h-4 cursor-pointer"
            />
          </CustomTooltip>
        </div>
      </div>
      <p className='my-4 text-[#515268]'>Lorem ipsum dolor sit amet consectetur. Gravida in egestas donec viverra a porttitor sit sed.</p>
      <div className="h-[45vh]">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default AgeDistributionChart;
