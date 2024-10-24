// components/PlaylistOverview.tsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

interface PlaylistOverviewProps {
    image: string | null;
    name: string;
    trackCount: number;
    followers: number;
    url: string;
}

const PlaylistOverview: React.FC<PlaylistOverviewProps> = ({ image, name, trackCount, followers, url }) => {
    return (
        <div className="bg-white p-4 shadow-lg rounded-lg">
            <div className="flex items-center gap-3">
                <h2 className="text-black">Playlist Analyzer</h2>
                <FontAwesomeIcon icon={faChevronRight} />
                <h2 className="font-bold text-[#1d4a5d]">Playlist Report</h2>
            </div>
            <h6 className="font-extrabold mt-4 text-black text-2xl">Playlist Report</h6>

            {/* Playlist Image and Details */}
            <div className="flex items-center mt-4">
                <img
                    src={image || '/images/default-playlist.jpg'}
                    alt="Playlist"
                    className="w-32 h-32 object-cover rounded-lg mr-4"
                />
                <div className="flex-1">
                    <div className="flex flex-row space-x-4">
                        <div className="text-lg font-semibold text-black">{name}</div>
                        <div className="flex items-center justify-center bg-[#eefaf0] px-4 py-1 rounded-md">
                            <img src="/images/safe-logo.png" alt="Safe Icon" className="w-4 h-5 mr-2" />
                            <span className="text-[#0a0f26] font-semibold">This playlist is safe</span>
                        </div>
                    </div>
                    <div className="flex flex-row space-x-4">
                        <div className="flex items-center mt-2">
                            <img
                                src="/images/music-note-02.png"
                                alt="Songs"
                                className="w-4 h-4 mr-1"
                            />
                            <span className="text-gray-600">{trackCount} songs</span>
                        </div>
                        <div className="flex items-center mt-2">
                            <img
                                src="/images/users-01.png"
                                alt="Followers"
                                className="w-4 h-4 mr-1"
                            />
                            <span className="text-gray-600">{followers} followers</span>
                        </div>
                    </div>
                    <div className="mt-2 text-[#373843]">There is a low chance that this playlist is botted.</div>
                    <div className="flex mt-2">
                        <div
                            className="flex items-center justify-center bg-[#eff5f7] px-4 py-1 rounded-md cursor-pointer hover:underline"
                            onClick={() => {
                                navigator.clipboard.writeText(window.location.href);
                            }}
                        >
                            <img src="/images/clipboard.png" alt="Clipboard Icon" className="w-4 h-4 mr-2" />
                            <span className="text-[#1d4a5d] font-semibold">Copy Report Link</span>
                        </div>

                        <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center bg-[#eff5f7] px-4 py-1 rounded-md ml-4 hover:underline"
                        >
                            <img src="/images/open.png" alt="Open Icon" className="w-4 h-4 mr-2" />
                            <span className="text-[#1d4a5d] font-semibold">Open on Spotify</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlaylistOverview;
