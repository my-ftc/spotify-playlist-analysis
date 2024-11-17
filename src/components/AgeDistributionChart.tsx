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
import { useState, useEffect } from 'react';
import InfoDialog from './InfoDialog';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Legend, Tooltip);

interface AgeDistributionChartProps {
  ageDistribution: { [ageGroup: string]: number };
}

const AgeDistributionChart: React.FC<AgeDistributionChartProps> = ({ ageDistribution }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null); // Track the active hover index
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);
  const [barThickness, setBarThickness] = useState(80);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 800) {
        setBarThickness(30);
      } else {
        setBarThickness(80);
      }
    };

    // Set initial bar thickness based on current window size
    handleResize();

    // Listen for window resize events
    window.addEventListener('resize', handleResize);

    // Clean up event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const data = {
    labels: Object.keys(ageDistribution),
    datasets: [
      {
        label: 'Number of Tracks',
        data: Object.values(ageDistribution),
        backgroundColor: 'rgba(29, 74, 93)', // Default bar color
        hoverBackgroundColor: 'rgba(7, 45, 61)', // Color on hover
        borderRadius: 5, // Makes the top of the bars rounded
        barThickness: barThickness,
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
        title: {
          display: true,
          text: 'Age of tracks (in months)',
          color: '#000', // Set the title color (optional)
          font: {
            size: 14, // Set font size for the title (optional)
            family: 'Arial', // Set font family for the title (optional)
          },
        }
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
    <div className="bg-white shadow-lg rounded-lg p-4 mt-5 h-fit 3xs:text-sm xs:text-base">
      <div className="flex items-center mt-3">
        <h2 className='xs:text-lg font-bold text-black'>Track Age Analysis</h2>

        <div className="flex items-center bg-[#eefaf0] px-2 py-1 rounded-lg ml-4">
          <img src="/images/safe-logo.png" alt="Safe Icon" className="w-4 h-5 mr-2" />
          <span className="text-[#0a0f26] font-semibold">Safe</span>
        </div>

        <div className="relative group ml-4 flex items-center">
          <CustomTooltip title="Click for more details about the track age analysis.">
            <img
              src="/images/info.png"
              alt="Info Icon"
              className="w-4 h-4 cursor-pointer"
              onClick={openDialog}
            />
          </CustomTooltip>

          {isDialogOpen && (
            <InfoDialog
              title="Track Age Analysis"
              content="The track age analysis provides insights into the age distribution of the tracks, allowing you to see how tracks are spread across various age ranges. This information can help in identifying trends and patterns in the playlist."
              onClose={closeDialog}
              safe={true}
            />
          )}
        </div>
      </div>
      <p className='3xs:my-2.5 xs:my-4 text-[#515268]'>A breakdown of the age ranges of the tracks in the playlist.</p>
      <div className="h-[45vh]">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default AgeDistributionChart;
