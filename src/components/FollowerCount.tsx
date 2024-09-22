// components/FollowerCount.tsx

import LineGraph from './LineGraph';

interface FollowerCountProps {
  followers: number | null;
  trackCount: number | null;
  followerCountArray: number[];
}

const FollowerCount: React.FC<FollowerCountProps> = ({ followers, trackCount, followerCountArray }) => {
  if (followers === null || trackCount === null) return null;

  // Create a new array for the line graph
  const graphData = [...followerCountArray, followers]; // Append the current follower count

  return (
    <div>
      <h2>Followers: {followers} | Tracks: {trackCount}</h2>
      {followerCountArray.length > 0 && <LineGraph data={graphData} />}
    </div>
  );
};

export default FollowerCount;
