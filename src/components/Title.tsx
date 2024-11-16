import React from 'react';

const Title: React.FC = () => {
    return (
        <div className="flex flex-col items-center text-center 3xs:mt-10 xs:mt-24 sm:mt-40 md:mt-44 lg:mt-52">
            <h1 className="3xs:text-2xl 2xs:text-3xl xs:text-5xl md:text-6xl font-extrabold text-white">Spotify Playlist Analyzer</h1>
            <p className="3xs:text-xs xs:text-lg md:text-xl text-gray-200 mt-1p 3xs:mx-10 tracking-wider">
                Real-time analysis of playlists to check for quality, bots, and history.
            </p>
        </div>
    );
};

export default Title;
