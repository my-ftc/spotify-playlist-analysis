// components/FollowerCount.tsx

import LineGraph from './LineGraph';

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

  // Extract the follower counts and dates for the graph
  const graphData = followerCountArray.map(entry => ({
    date: new Date(entry.updated_time).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit' }), // Format as DD-MM
    count: entry.count,
  }));

  // Append the current follower count with today's date
  const updatedGraphData = [...graphData, { date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit' }), count: followers }];

  return (
    <div className='bg-white p-4 rounded-lg shadow-lg max-w-full overflow-x-auto mt-5'>
      <h2 className="text-lg font-bold text-black">Follower growth analysis</h2>
      <LineGraph data={updatedGraphData} />
    </div>
  );
};

export default FollowerCount;
