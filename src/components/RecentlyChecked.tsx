import React from 'react';
import Link from 'next/link';
import Pagination from './Pagination';
import { timeSince } from "../lib/localStorageUtils";
import { extractPlaylistId } from '@/utils/helpers';

export interface Search {
    name: string;
    url: string;
    ownerId: string;
    followers: number;
    tracks: number;
    date: string;
    image: string | null;
}

export interface RecentlyCheckedProps {
    paginatedSearches: Search[];
    totalPages: number;
    currentPage: number;
    setCurrentPage: (page: number) => void;
}

const RecentlyChecked: React.FC<RecentlyCheckedProps> = ({ paginatedSearches, totalPages, currentPage, setCurrentPage }) => {
    return (
        <div className="w-3/4 pr-4">
            <h2 className="font-extrabold text-black">Recently checked</h2>
            <p className="text-[#636588] mt-3">Latest playlists that have been analysed.</p>

            <div className="bg-white p-4 rounded-lg shadow-md mt-4">
                <div className="grid grid-cols-12 text-left border-b border-gray-300 pb-2">
                    <div className="col-span-4 text-[#8789a8]">Playlist</div>
                    <div className="col-span-1 text-center text-[#8789a8]">Songs</div>
                    <div className="col-span-2 text-center text-[#8789a8]">Followers</div>
                    <div className="col-span-1 text-center text-[#8789a8]">Checked</div>
                    <div className="col-span-2 text-center text-[#8789a8]">Status</div>
                    <div className="col-span-2 text-center text-[#8789a8]"></div>
                </div>

                <ul>
                    {paginatedSearches.map((search, index) => (
                        <li key={index} className="grid grid-cols-12 gap-4 py-4">
                            {/* Playlist Image and Name */}
                            <div className="col-span-4 flex items-center">
                                <img
                                    src={search.image || 'default-image.jpg'}
                                    alt={search.name}
                                    className="w-12 h-12 object-cover rounded-lg mr-3"
                                />
                                <div>
                                    <a
                                        href={search.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[#373843] hover:underline font-semibold"
                                    >
                                        {search.name}
                                    </a>
                                    <div className="text-[#8789a8]">{search.ownerId}</div>
                                </div>
                            </div>

                            {/* Songs Count */}
                            <div className="col-span-1 flex items-center justify-center text-gray-600">
                                {search.tracks}
                            </div>

                            {/* Followers Count */}
                            <div className="col-span-2 flex items-center justify-center text-gray-600">
                                {search.followers}
                            </div>

                            {/* Checked Date */}
                            <div className="col-span-1 flex items-center justify-center text-gray-600">
                                {timeSince(search.date)}
                            </div>

                            {/* Status Column */}
                            <div className="col-span-2 flex items-center justify-center">
                                <div className="flex items-center bg-[#eefaf0] px-2 py-1 rounded-lg">
                                    <img src="/images/safe-logo.png" alt="Safe Icon" className="w-4 h-5 mr-2" />
                                    <span className="text-[#0a0f26] font-semibold">Safe</span>
                                </div>
                            </div>

                            <div className="col-span-2 flex items-center justify-center">
                                <Link
                                    href={`/playlist/${extractPlaylistId(search.url)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center text-[#1d4a5d] font-semibold hover:underline"
                                >
                                    <img
                                        src="/images/report.png"
                                        alt="Report"
                                        className="w-4 h-5 mr-2"
                                    />
                                    Report
                                </Link>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {totalPages > 1 && (
                <div className="flex justify-end mt-4">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </div>
            )}
        </div>
    );
};

export default RecentlyChecked;
