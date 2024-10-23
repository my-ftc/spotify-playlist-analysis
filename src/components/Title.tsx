import React from 'react';

const Title: React.FC = () => {
    return (
        <div className="text-left mt-15p">
            <h1 className="text-6xl font-extrabold text-white">Spotify Playlist Analyzer</h1>
            <p className="text-xl text-gray-200 mt-1p tracking-wider">
                Real-time analysis of playlists to check for quality, bots, and history.
            </p>
        </div>
    );
};

export default Title;
