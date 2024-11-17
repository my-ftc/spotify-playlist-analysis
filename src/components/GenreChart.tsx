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
  const isConsistent = evaluateDiversification(genres);

  // Sort genres and select the top 10
  const sortedGenres = Object.entries(genres)
    .sort(([, countA], [, countB]) => countB - countA)
    .slice(0, 10);

  // Dynamic content for the InfoDialog
  const infoDialogContent = isConsistent
    ? 'The playlist contains fewer genres, making it more consistent and focused.'
    : 'The playlist features a wide variety of genres, making it less consistent and more diverse.';

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mt-5 3xs:w-full md:w-1/2 h-fit 3xs:text-sm xs:text-base">
      <div className="flex items-center xs:mt-3">
        <h2 className="xs:text-lg font-bold text-black">Genre Analysis</h2>

        <div className={`flex items-center px-2 py-1 rounded-md ml-4 ${isConsistent ? 'bg-[#eefaf0]' : 'bg-[#fce7e7]'}`}>
          <img src={isConsistent ? "/images/safe-logo.png" : "/images/issues-logo.png"} alt="Status Icon" className="w-4 h-5 mr-2" />
          <span className={`text-[#0a0f26] font-semibold`}>
            {isConsistent ? 'Safe' : 'Issues Detected'}
          </span>
        </div>

        <div className="relative group ml-4 flex items-center">
          <CustomTooltip title="Click for more details about the genre analysis.">
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
              content={infoDialogContent}
              onClose={closeDialog}
              safe={isConsistent}
            />
          )}
        </div>
      </div>

      <p className="3xs:my-2.5 xs:my-4 text-[#515268]">A breakdown of the playlist&#39;s genre diversity.</p>

      <div className="flex flex-wrap gap-2 mt-2">
        {sortedGenres.map(([genre]) => (
          <div
            key={genre}
            className="rounded-full 3xs:p-2.5 xs:p-4 text-black"
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
