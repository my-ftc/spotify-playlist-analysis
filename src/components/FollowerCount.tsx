// components/FollowerCount.tsx

import LineGraph from './LineGraph';
import Tooltip from '@mui/material/Tooltip';

interface FollowerData {
  count: number;
  updated_time: string; // Expecting a date string that can be formatted
}

interface FollowerCountProps {
  followers: number | null;
  trackCount: number | null;
  followerCountArray: FollowerData[];
}

const FollowerCount: React.FC<FollowerCountProps> = ({ followers, trackCount, followerCountArray }) => {
  if (followers === null || trackCount === null || followerCountArray.length === 0) return null;

  const graphData = followerCountArray.map(entry => ({
    date: new Date(entry.updated_time).toLocaleDateString('en-US', { month: 'short', day: '2-digit' }),
    count: entry.count,
  }));
  const updatedGraphData = [...graphData, { date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit' }), count: followers }];

  return (
    <div className='bg-white p-4 rounded-lg shadow-lg max-w-full overflow-x-auto mt-5'>
      <div className="flex items-center mt-3">
        <h2 className="text-lg font-bold font-poppins text-[#0a0f26]">Follower growth analysis</h2>

        <div className="flex items-center bg-[#eefaf0] px-2 py-1 rounded-lg ml-4">
          <img src="/images/safe-logo.png" alt="Safe Icon" className="w-4 h-5 mr-2" />
          <span className="text-[#0a0f26] font-poppins font-semibold">Safe</span>
        </div>

        <div className="relative group ml-4 flex items-center">
          <Tooltip
            title="Lorem ipsum dolor sit amet consectetur. Gravida in egestas donec viverra a porttitor sit sed."
            arrow
            placement="right"
            classes={{
              tooltip: 'tooltip-black',
              arrow: 'tooltip-arrow-black',
            }}
          >
            <img
              src="/images/info.png"
              alt="Info Icon"
              className="w-4 h-4 cursor-pointer" />
          </Tooltip>
        </div>
      </div>

      <p className='my-4 text-[#515268]'>Lorem ipsum dolor sit amet consectetur. Gravida in egestas donec viverra a porttitor sit sed.</p>
      <LineGraph data={updatedGraphData} />
    </div>
  );
};

export default FollowerCount;
