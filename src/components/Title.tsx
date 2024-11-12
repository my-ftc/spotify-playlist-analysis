import React from 'react';

const Title: React.FC = () => {
    return (
        <div className="flex flex-col items-center text-center xxs:mt-10 xs:mt-5p sm:mt-10p md:mt-15p">
            <h1 className="xxs:text-2xl xs:text-6xl font-extrabold text-white">Spotify Playlist Analyzer</h1>
            <p className="xxs:text-xs xs:text-xl text-gray-200 mt-1p xxs:mx-10 tracking-wider">
                Real-time analysis of playlists to check for quality, bots, and history.
            </p>
        </div>
    );
};

export default Title;
