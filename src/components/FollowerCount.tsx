import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import InfoDialog from './InfoDialog';

interface FollowerData {
  count: number;
  updated_time: string;
}

interface FollowerCountProps {
  followers: number | null;
  trackCount: number | null;
  followerCountArray: FollowerData[];
  isAnomalyDetected: boolean;
}

const FollowerCount: React.FC<FollowerCountProps> = ({ followers, trackCount, followerCountArray, isAnomalyDetected }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  if (followers === null || trackCount === null || followerCountArray.length === 0) {
    return null;
  }

  const graphData = followerCountArray.map(entry => ({
    date: new Date(entry.updated_time).toLocaleDateString('en-US', { month: 'short', day: '2-digit' }),
    count: entry.count,
  }));

  const updatedGraphData = [
    ...graphData,
    { date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit' }), count: followers }
  ];

  const infoDialogContent = isAnomalyDetected
    ? 'The follower count shows abnormal growth patterns, which could indicate unusual activity.'
    : 'The follower count appears consistent with no signs of unusual activity.';

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg max-w-full overflow-x-auto mt-5 3xs:text-sm xs:text-base">
      <div className="flex items-center xs:mt-3">
        <h2 className="xs:text-lg font-bold font-poppins text-[#0a0f26]">Follower growth analysis</h2>
        <div className={`flex items-center px-2 py-1 rounded-lg ml-4 ${isAnomalyDetected ? 'bg-[#fce7e7]' : 'bg-[#eefaf0]'}`}>
          <img src={isAnomalyDetected ? "/images/issues-logo.png" : "/images/safe-logo.png"} alt="Status Icon" className="w-4 h-5 mr-2" />
          <span className="text-[#0a0f26] font-poppins font-semibold">
            {isAnomalyDetected ? 'Issues Detected' : 'Safe'}
          </span>
        </div>
        <div className="relative group ml-4 flex items-center">
          <img
            src="/images/info.png"
            alt="Info Icon"
            className="w-4 h-4 cursor-pointer"
            onClick={openDialog}
          />
          {isDialogOpen && (
            <InfoDialog
              title="Follower growth analysis"
              content={infoDialogContent} // Use dynamic content
              onClose={closeDialog}
              safe={!isAnomalyDetected}
            />
          )}
        </div>
      </div>
      <p className="3xs:my-2.5 xs:my-4 text-[#515268]">A detailed analysis of the playlist's follower growth patterns.</p>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={updatedGraphData} margin={{ top: 10, right: 30, left: 40, bottom: 10 }}>
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1d4a5d" stopOpacity={0.5} />
              <stop offset="100%" stopColor="#25b1cd" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
          <XAxis
            dataKey="date"
            tick={{ fill: '#636588', fontFamily: 'Poppins' }}
            axisLine={{ stroke: '#E5E7EB' }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: '#636588', fontFamily: 'Poppins' }}
            axisLine={{ stroke: '#E5E7EB' }}
            tickLine={false}
            label={{
              value: 'Followers',
              angle: -90,
              position: 'outsideLeft', // Ensures the label is placed outside
              dx: -60, // Moves the label farther to the left
              style: {
                fill: '#636588',
                fontFamily: 'Poppins',
                fontSize: 14,
              },
            }}
          />

          <Tooltip
            cursor={false} // Disable the tooltip cursor that spans the graph
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                const currentValue = Number(payload[0].value);

                return (
                  <div className="p-2 bg-[#0A0F26] rounded-lg shadow-lg border border-gray-700">
                    <p className="text-white mb-1">
                      <span className="font-bold">{label}</span>
                    </p>
                    <p className="text-white">Followers: {currentValue.toFixed(0)}</p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Area
            type="linear" // Set line type to straight
            dataKey="count"
            stroke="#1d4a5d"
            strokeWidth={2}
            fill="url(#colorGradient)"
            dot={{ r: 4, fill: '#1d4a5d' }} // Add dots to the graph
            activeDot={{ r: 6, fill: '#1d4a5d' }} // Highlight the active dot
            name="Followers"
          />
        </AreaChart>
      </ResponsiveContainer>

    </div>
  );
};

export default FollowerCount;
