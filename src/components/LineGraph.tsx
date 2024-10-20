// components/LineGraph.tsx

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the components
ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend);

// Update the prop type to include date and count
interface FollowerCountData {
  date: string; // DD-MMM format
  count: number; // Follower count
}

interface LineGraphProps {
  data: FollowerCountData[]; // Expect an array of objects containing date and count
}

const LineGraph: React.FC<LineGraphProps> = ({ data }) => {
  // Extract dates and follower counts for the chart
  const dates = data.map(entry => entry.date);
  const counts = data.map(entry => entry.count);

  const chartData = {
    labels: dates, // Dates for the x-axis
    datasets: [
      {
        data: counts, // Follower counts for the y-axis
        fill: false,
        borderColor: 'blue',
        tension: 0.1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        min: 0,
        grid: {
          color: '#f6f6fb', // Set grid color
        },
        ticks: {
          precision: 0, // Ensure y-axis values are integers
        },
        title: {
          display: true, // Display the title
          text: 'Followers', // Set the title text
          color: '#000', // Set the title color (optional)
          font: {
            size: 14, // Set font size for the title (optional)
            family: 'Arial', // Set font family (optional)
          },
        },
        border: {
          color: '#f6f6fb', // Set the border color for y-axis
        },
      },
      x: {
        grid: {
          color: '#f6f6fb', // Set grid color for x-axis as well
        },
        border: {
          color: '#f6f6fb', // Set the border color for x-axis
        },
      },
    },
  };

  return (
    <div>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LineGraph;
