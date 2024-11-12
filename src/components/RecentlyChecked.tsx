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
        <div className="xxs:w-full xs:w-3/4">
            <h2 className="font-extrabold text-black xxs:text-xs xs:text-sm md:text-base xxs:ml-2 xs:ml-0">Recently checked</h2>
            <p className="text-[#636588] xxs:mt-1 xs:mt-3 xxs:text-xs xs:text-sm md:text-base xxs:ml-2 xs:ml-0">Latest playlists that have been analysed.</p>

            <div className="hidden xxs:hidden xs:block bg-white xxs:p-2 xs:p-4 rounded-lg shadow-md mt-4">
                <div className="hidden xs:grid grid-cols-12 text-left border-b border-gray-300 pb-2">
                    <div className="col-span-4 text-[#8789a8]">Playlist</div>
                    <div className="col-span-1 text-center text-[#8789a8]">Songs</div>
                    <div className="col-span-2 text-center text-[#8789a8]">Followers</div>
                    <div className="col-span-1 text-center text-[#8789a8]">Checked</div>
                    <div className="col-span-2 text-center text-[#8789a8]">Status</div>
                    <div className="col-span-2 text-center text-[#8789a8]"></div>
                </div>

                <ul>
                    {paginatedSearches.map((search, index) => (
                        <li key={index} className="grid xxs:grid-cols-11 sm:grid-cols-12 xs:gap-2 md:gap-4 py-4">
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
                                        className="text-[#373843] hover:underline font-semibold xxs:text-xs xs:text-sm md:text-base"
                                    >
                                        {search.name}
                                    </a>
                                    <div className="text-[#8789a8] xxs:text-xs xs:text-sm md:text-base">{search.ownerId}</div>
                                </div>
                            </div>

                            {/* Songs Count */}
                            <div className="col-span-1 flex items-center justify-center text-gray-600 xxs:text-xs xs:text-sm md:text-base">
                                {search.tracks}
                            </div>

                            {/* Followers Count */}
                            <div className="col-span-2 flex items-center justify-center text-gray-600 xxs:text-xs xs:text-sm md:text-base">
                                {search.followers}
                            </div>

                            {/* Checked Date */}
                            <div className="col-span-1 flex items-center justify-center text-gray-600 xxs:text-xs xs:text-sm md:text-base">
                                {timeSince(search.date)}
                            </div>

                            {/* Status Column */}
                            <div className="col-span-2 flex items-center justify-center">
                                <div className="flex items-center bg-[#eefaf0] px-2 py-1 rounded-lg">
                                    <img src="/images/safe-logo.png" alt="Safe Icon" className="xxs:w-3 md:w-4 h-auto mr-2" />
                                    <span className="text-[#0a0f26] font-semibold xxs:text-xs xs:text-sm md:text-base">Safe</span>
                                </div>
                            </div>

                            <div className="xs:col-span-1 sm:col-span-2 md:col-span-2 lg:col-span-2 flex items-center justify-center">
                                <Link
                                    href={`/playlist/${extractPlaylistId(search.url)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center text-[#1d4a5d] font-semibold hover:underlin xs:text-sm sm:text-sm md:text-base"
                                >
                                    <img
                                        src="/images/report.png"
                                        alt="Report"
                                        className="xxs:w-3 md:w-4 h-auto mr-2"
                                    />
                                    <span className='xxs:text-xs xs:text-sm md:text-base'>Report</span>
                                </Link>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="xs:hidden bg-white xxs:p-2 xs:p-4 rounded-lg shadow-md mt-4">
                <ul>
                    {paginatedSearches.map((search, index) => (
                        <li key={index} className="py-3">
                            <div className="flex flex-row items-center">
                                <img
                                    src={search.image || 'default-image.jpg'}
                                    alt={search.name}
                                    className="w-16 h-auto object-cover rounded-lg ml-1.5 mr-2"
                                />
                                <div className='flex flex-col space-y-0.5'>
                                    <div className="flex flex-row items-center">
                                        <a
                                            href={search.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[#373843] hover:underline font-semibold xxs:text-xs xs:text-sm md:text-base"
                                        >
                                            {search.name}
                                        </a>
                                    </div>

                                    <div className="text-[#8789a8] text-xs">{search.ownerId}</div>

                                    <div className="flex flex-row space-x-3 text-xs">
                                        <div className="flex items-center">
                                            <img
                                                src="/images/music-note-02.png"
                                                alt="Songs"
                                                className="w-3 h-auto mr-1"
                                            />
                                            <span className="text-gray-600">{search.tracks} songs</span>
                                        </div>
                                        <div className="flex items-center">
                                            <img
                                                src="/images/users-01.png"
                                                alt="Followers"
                                                className="w-3 h-auto mr-1"
                                            />
                                            <span className="text-gray-600">{search.followers} followers</span>
                                        </div>
                                    </div>

                                    <div className="text-[#8789a8] text-xs">Last checked {timeSince(search.date)}</div>
                                </div>
                                <div className='flex flex-col ml-auto mr-1 space-y-2'>
                                    <div className="col-span-2 flex items-center">
                                        <div className="flex items-center bg-[#eefaf0] px-2 py-1 rounded-lg">
                                            <img src="/images/safe-logo.png" alt="Safe Icon" className="xxs:w-3 md:w-4 h-auto mr-2" />
                                            <span className="text-[#0a0f26] font-semibold xxs:text-xs xs:text-sm md:text-base">Safe</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-center">
                                        <Link
                                            href={`/playlist/${extractPlaylistId(search.url)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center text-[#1d4a5d] font-semibold hover:underlin xs:text-sm sm:text-sm md:text-base"
                                        >
                                            <img
                                                src="/images/report.png"
                                                alt="Report"
                                                className="xxs:w-3 md:w-4 h-auto mr-2"
                                            />
                                            <span className='xxs:text-xs xs:text-sm md:text-base underline'>Report</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {totalPages > 1 && (
                <div className="flex justify-end mt-4 xxs:text-xs xs:text-base">
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
