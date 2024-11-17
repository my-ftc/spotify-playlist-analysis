import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';
import CustomTooltip from './Tooltip';
import InfoDialog from './InfoDialog';

interface AgeDistributionChartProps {
  ageDistribution: { [ageGroup: string]: number };
}

const AgeDistributionChart: React.FC<AgeDistributionChartProps> = ({ ageDistribution }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null); // Track the active hover index
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [barSize, setBarSize] = useState(80);
  const [opacity, setOpacity] = useState<number | null>(null); // Track the opacity of the bar
  const [hoveredBarIndex, setHoveredBarIndex] = useState<number | null>(null); // Track hovered bar index

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  const data = Object.entries(ageDistribution).map(([key, value]) => ({
    ageGroup: key,
    count: value,
  }));

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 800) {
        setBarSize(30);
      } else {
        setBarSize(80);
      }
    };

    // Set initial bar size based on current window size
    handleResize();

    // Listen for window resize events
    window.addEventListener('resize', handleResize);

    // Clean up event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const CustomTooltipContent = ({ active, payload }: { active?: boolean; payload?: any }) => {
    if (active && payload && payload.length && payload[0].value !== 0) {
      return (
        <div
          style={{
            backgroundColor: '#0A0F26',
            padding: '8px 12px',
            borderRadius: '5px',
            color: '#fff',
          }}
        >
          <p style={{ margin: 0 }}>{`Number of tracks: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null; // Do not show tooltip when there is no data or when count is 0
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 mt-5 h-fit 3xs:text-sm xs:text-base">
      <div className="flex items-center mt-3">
        <h2 className="xs:text-lg font-bold text-black">Track Age Analysis</h2>

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
      <p className="3xs:my-2.5 xs:my-4 text-[#515268]">
        A breakdown of the age ranges of the tracks in the playlist.
      </p>
      <div className="h-[45vh]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            barCategoryGap={5}
            barSize={barSize}
            onMouseMove={(state) => {
              if (state?.activeTooltipIndex !== undefined) {
                setActiveIndex(state.activeTooltipIndex);
              }
            }}
            onMouseLeave={() => {
              setActiveIndex(null);
              setOpacity(null); // Reset opacity when the mouse leaves the bar
              setHoveredBarIndex(null); // Reset hovered bar index
            }}
          >
            <CartesianGrid stroke="#f6f6fb" />
            <XAxis
              dataKey="ageGroup"
              stroke="#f6f6fb"
              tick={{
                fill: '#636588',
                fontFamily: 'Poppins',
              }}
            />
            <YAxis
              stroke="#f6f6fb"
              tick={{
                fill: '#636588',
                fontFamily: 'Poppins',
              }}
              label={{
                value: 'Number of tracks',
                angle: -90,
                position: 'insideLeft',
                fill: '#000',
                style: { fontSize: 14, fontFamily: 'Poppins' },
              }}
            />
            <Tooltip
              content={<CustomTooltipContent />}
              cursor={false} // Prevent the default gray hover effect
              isAnimationActive={false} // Disable animation for the tooltip
            />
            <Bar
              dataKey="count"
              fill={hoveredBarIndex === null ? "rgba(29, 74, 93)" : "#172d3d"} // Set color based on hover state
              radius={[5, 5, 0, 0]}
              fillOpacity={opacity === null ? 1 : opacity} // Set opacity dynamically
              onMouseOver={(data, index) => {
                setHoveredBarIndex(index); // Track hovered bar index
              }}
              onMouseOut={() => {
                setHoveredBarIndex(null); // Reset hovered bar index when mouse leaves
                setOpacity(null); // Reset opacity when mouse leaves
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AgeDistributionChart;
