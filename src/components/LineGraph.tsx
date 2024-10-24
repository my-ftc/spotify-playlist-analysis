import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
  Chart as ChartInstance,
} from 'chart.js';
import { useRef } from 'react';

// Register the components
ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend);

interface FollowerCountData {
  date: string; // DD-MMM format
  count: number; // Follower count
}

interface LineGraphProps {
  data: FollowerCountData[]; // Expect an array of objects containing date and count
}

const LineGraph: React.FC<LineGraphProps> = ({ data }) => {
  const chartRef = useRef<ChartInstance<'line'>>(null);

  const dates = data.map(entry => entry.date);
  const counts = data.map(entry => entry.count);

  const chartData: ChartData<'line'> = {
    labels: dates,
    datasets: [
      {
        data: counts,
        fill: true,
        backgroundColor: 'rgba(29, 74, 93, 0.5)', // Static color fill
        borderColor: '#1d4a5d',
        tension: 0.1,
        pointRadius: 5,
        pointBackgroundColor: '#1d4a5d',
        pointBorderColor: '#1d4a5d',
        pointBorderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        min: 0,
        grid: {
          color: '#f6f6fb',
        },
        ticks: {
          precision: 0,
          color: '#636588',
          font: {
            family: 'Poppins',
          },
        },
        title: {
          display: true,
          text: 'Followers',
          color: '#000',
          font: {
            size: 14,
            family: 'Poppins',
          },
        },
      },
      x: {
        grid: {
          color: '#f6f6fb',
        },
        ticks: {
          color: '#636588',
          font: {
            family: 'Poppins',
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div style={{ height: '400px' }}>
      <Line ref={chartRef} data={chartData} options={options} />
    </div>
  );
};

export default LineGraph;
