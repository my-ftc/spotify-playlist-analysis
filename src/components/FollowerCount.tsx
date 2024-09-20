// components/FollowerCount.tsx

interface FollowerCountProps {
    followers: number | null;
  }
  
  const FollowerCount: React.FC<FollowerCountProps> = ({ followers }) => {
    if (followers === null) return null;
  
    return (
      <div>
        <h2>Followers: {followers}</h2>
      </div>
    );
  };
  
  export default FollowerCount;
  