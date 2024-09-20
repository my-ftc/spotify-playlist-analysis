// components/GenreTable.tsx

import GenreChart from './GenreChart';

interface GenreTableProps {
  genres: { [genre: string]: number };
}

const GenreTable: React.FC<GenreTableProps> = ({ genres }) => {
  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold">Top Genres</h2>
      <GenreChart genres={genres} />
    </div>
  );
};

export default GenreTable;
