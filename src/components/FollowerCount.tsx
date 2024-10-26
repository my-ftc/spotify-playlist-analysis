// components/FollowerCount.tsx

import { useState } from 'react';
import LineGraph from './LineGraph';
import CustomTooltip from './Tooltip';
import InfoDialog from './InfoDialog';

interface FollowerData {
  count: number;
  updated_time: string;
}

interface FollowerCountProps {
  followers: number | null;
  trackCount: number | null;
  followerCountArray: FollowerData[];
}

const FollowerCount: React.FC<FollowerCountProps> = ({ followers, trackCount, followerCountArray }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  // If data is missing, we’ll render null later instead of early return.
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

  return (
    <div className='bg-white p-4 rounded-lg shadow-lg max-w-full overflow-x-auto mt-5'>
      <div className="flex items-center mt-3">
        <h2 className="text-lg font-bold font-poppins text-[#0a0f26]">Follower growth analysis</h2>

        <div className="flex items-center bg-[#eefaf0] px-2 py-1 rounded-lg ml-4">
          <img src="/images/safe-logo.png" alt="Safe Icon" className="w-4 h-5 mr-2" />
          <span className="text-[#0a0f26] font-poppins font-semibold">Safe</span>
        </div>

        <div className="relative group ml-4 flex items-center">
          <CustomTooltip title="Lorem ipsum dolor sit amet consectetur. Gravida in egestas donec viverra a porttitor sit sed.">
            <img
              src="/images/info.png"
              alt="Info Icon"
              className="w-4 h-4 cursor-pointer"
              onClick={openDialog}
            />
          </CustomTooltip>

          {isDialogOpen && (
            <InfoDialog
              title="Follower growth analysis"
              content="Lorem ipsum dolor sit amet consectetur. Gravida in egestas donec viverra a porttitor sit sed."
              onClose={closeDialog}
            />
          )}
        </div>
      </div>

      <p className='my-4 text-[#515268]'>Lorem ipsum dolor sit amet consectetur. Gravida in egestas donec viverra a porttitor sit sed.</p>
      <LineGraph data={updatedGraphData} />
    </div>
  );
};

export default FollowerCount;
