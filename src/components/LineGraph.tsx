// components/LineGraph.tsxß

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

interface LineGraphProps {
  data: number[];
}

const LineGraph: React.FC<LineGraphProps> = ({ data }) => {
  const chartData = {
    labels: data.map((_, index) => `Point ${index + 1}`), // Create labels for the x-axis
    datasets: [
      {
        label: 'Follower Count Over Time',
        data: data,
        fill: false,
        borderColor: 'blue',
        tension: 0.1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        ticks: {
          precision: 0, // Ensure y-axis values are integers
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