// components/GenreChart.tsx

import React from 'react';
import CustomTooltip from './Tooltip';

interface GenreChartProps {
  genres: { [genre: string]: number };
}

const GenreChart: React.FC<GenreChartProps> = ({ genres }) => {
  // Sort genres and select the top 10
  const sortedGenres = Object.entries(genres)
    .sort(([, countA], [, countB]) => countB - countA)
    .slice(0, 10);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mt-5 w-1/2 h-fit">
      <div className="flex items-center mt-3">
        <h2 className="font-bold text-black">Genre Analysis</h2>

        <div className="flex items-center bg-[#eefaf0] px-2 py-1 rounded-lg ml-4">
          <img src="/images/safe-logo.png" alt="Safe Icon" className="w-4 h-5 mr-2" />
          <span className="text-[#0a0f26] font-semibold">Safe</span>
        </div>

        <div className="relative group ml-4 flex items-center">
          <CustomTooltip title="Lorem ipsum dolor sit amet consectetur.">
            <img
              src="/images/info.png"
              alt="Info Icon"
              className="w-4 h-4 cursor-pointer"
            />
          </CustomTooltip>
        </div>
      </div>

      <p className='my-4 text-[#515268]'>Lorem ipsum dolor sit amet consectetur. </p>

      <div className="flex flex-wrap gap-2 mt-2">
        {sortedGenres.map(([genre]) => (
          <div
            key={genre}
            className="rounded-full p-4 text-black"
            style={{
              backgroundColor: '#dbe8ed',
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
