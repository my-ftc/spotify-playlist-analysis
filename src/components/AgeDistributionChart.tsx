// components/AgeDistributionChart.tsx

import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

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
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
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
        text: 'Track Age Distribution',
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
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default AgeDistributionChart;
