// components/PlaylistOverview.tsx
import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

interface PlaylistOverviewProps {
    image: string | null;
    name: string;
    trackCount: number;
    followers: number;
    url: string;
    isAnomalyDetected: true | false;
}

const PlaylistOverview: React.FC<PlaylistOverviewProps> = ({ image, name, trackCount, followers, url, isAnomalyDetected }) => {
    return (
        <div className="bg-white p-4 shadow-lg rounded-lg">
            <div className="flex items-center gap-3">
                <Link href="/" passHref>
                    <h2 className="text-[#515268] cursor-pointer hover:underline xxs:text-sm xs:text-base">Playlist Analyzer</h2>
                </Link>
                <FontAwesomeIcon icon={faChevronRight} />
                <h2 className="font-bold text-[#1d4a5d] xxs:text-sm xs:text-base">Playlist Report</h2>
            </div>
            <h6 className="font-extrabold mt-4 text-black xxs:text-xl xs:text-2xl">Playlist Report</h6>

            {/* Playlist Image and Details */}
            <div className="flex flex-row mt-4">
                <img
                    src={image || '/images/default-playlist.jpg'}
                    alt="Playlist"
                    className="xxs:w-24 xxs:h-24 xs:w-32 xs:h-32 object-cover rounded-lg mr-4"
                />
                <div className="flex-1 xxs:text-xs xs:text-base">
                    <div className="flex xxs:flex-col xs:flex-row xs:items-center xs:space-x-4 xxs:space-y-1 xs:space-y-0">
                        <div className="xxs:text-sm xs:text-lg font-semibold text-black">{name}</div>
                        <div className={`flex w-fit items-center xxs:px-2 xs:px-4 py-1 rounded-md ${isAnomalyDetected ? 'bg-[#fce7e7]' : 'bg-[#eefaf0]'}`}>
                            <img src={isAnomalyDetected ? "/images/issues-logo.png" : "/images/safe-logo.png"} alt="Safe Icon" className="w-4 h-auto mr-2" />
                            <span className="text-[#0a0f26] font-semibold">
                                {isAnomalyDetected ? 'This playlist might have issues' : 'This playlist is safe'}
                            </span>
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
                    <div className="mt-2 text-[#373843]">
                        {isAnomalyDetected ? "There is a chance that this playlist is botted." : "There is a low chance that this playlist is botted."}</div>
                    <div className="flex mt-2">
                        <div
                            className="flex items-center justify-center bg-[#eff5f7] xxs:px-2 xs:px-4 py-2 rounded-md cursor-pointer shadow-sm active:scale-95 active:bg-[#e0e7ea] transition-transform duration-100 group"
                            onClick={() => {
                                navigator.clipboard.writeText(window.location.href);
                            }}
                        >
                            <img src="/images/clipboard.png" alt="Clipboard Icon" className="xxs:w-3 xs:w-4 h-auto mr-2" />
                            <span className="text-[#1d4a5d] font-semibold group-hover:underline">Copy Report Link</span>
                        </div>

                        <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center bg-[#eff5f7] xxs:px-2 xs:px-4 py-2 rounded-md ml-4 cursor-pointer shadow-sm active:scale-95 active:bg-[#e0e7ea] transition-transform duration-100 group"
                        >
                            <img src="/images/open.png" alt="Open Icon" className="xxs:w-3 xs:w-4 h-auto mr-2" />
                            <span className="text-[#1d4a5d] font-semibold group-hover:underline">Open on Spotify</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlaylistOverview;
