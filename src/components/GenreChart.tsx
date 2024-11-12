// components/GenreChart.tsx

import React, { useState } from 'react';
import CustomTooltip from './Tooltip';
import InfoDialog from './InfoDialog';
import { evaluateDiversification } from '../utils/evaluateDiversification';

interface GenreChartProps {
  genres: { [genre: string]: number };
}

const GenreChart: React.FC<GenreChartProps> = ({ genres }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  // Determine if the playlist is diverse
  const isDiverse = evaluateDiversification(genres);

  // Sort genres and select the top 10
  const sortedGenres = Object.entries(genres)
    .sort(([, countA], [, countB]) => countB - countA)
    .slice(0, 10);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mt-5 xxs:w-full xs:w-1/2 h-fit xxs:text-sm xs:text-base">
      <div className="flex items-center xs:mt-3">
        <h2 className="font-bold text-black">Genre Analysis</h2>

        <div className={`flex items-center px-2 py-1 rounded-md ml-4 ${isDiverse ? 'bg-[#eefaf0]' : 'bg-[#fce7e7]'}`}>
          <img src={isDiverse ? "/images/safe-logo.png" : "/images/issues-logo.png"} alt="Status Icon" className="w-4 h-5 mr-2" />
          <span className={`text-[#0a0f26] font-semibold`}>
            {isDiverse ? 'Safe' : 'Issues Detected'}
          </span>
        </div>

        <div className="relative group ml-4 flex items-center">
          <CustomTooltip title="Lorem ipsum dolor sit amet consectetur.">
            <img
              src="/images/info.png"
              alt="Info Icon"
              className="w-4 h-4 cursor-pointer"
              onClick={openDialog}
            />
          </CustomTooltip>

          {isDialogOpen && (
            <InfoDialog
              title="Genre Analysis"
              content="Lorem ipsum dolor sit amet consectetur."
              onClose={closeDialog}
              safe={isDiverse}
            />
          )}
        </div>
      </div>

      <p className='xxs:my-2.5 xs:my-4 text-[#515268]'>Lorem ipsum dolor sit amet consectetur.</p>

      <div className="flex flex-wrap gap-2 mt-2">
        {sortedGenres.map(([genre]) => (
          <div
            key={genre}
            className="rounded-full xxs:p-2.5 xs:p-4 text-black"
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
