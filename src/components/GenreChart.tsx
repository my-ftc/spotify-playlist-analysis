// components/GenreChart.tsx

import React from 'react';

interface GenreChartProps {
  genres: { [genre: string]: number };
}

const GenreChart: React.FC<GenreChartProps> = ({ genres }) => {
  // Sort genres and select the top 10
  const sortedGenres = Object.entries(genres)
    .sort(([, countA], [, countB]) => countB - countA)
    .slice(0, 10);

  return (
    <div className='bg-white p-4 rounded-lg shadow-md mt-5 w-1/2 h-fit'>
      <h2 className='font-bold text-black'>Genre Analysis</h2>
      <div className='flex flex-wrap gap-2 mt-2'> {/* Use flex for horizontal alignment */}
        {sortedGenres.map(([genre, count]) => (
          <div
            key={genre}
            className='rounded-full p-4 text-black' // Updated text color to black for contrast
            style={{
              backgroundColor: '#dbe8ed', // Set the specified background color
            }}
          >
            {genre}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenreChart;
