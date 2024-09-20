// components/FollowerCount.tsx

interface FollowerCountProps {
  followers: number | null;
  trackCount: number | null;
}

const FollowerCount: React.FC<FollowerCountProps> = ({ followers, trackCount }) => {
  if (followers === null || trackCount === null) return null;

  return (
    <div>
      <h2>Followers: {followers} | Tracks: {trackCount}</h2>
    </div>
  );
};

export default FollowerCount;
