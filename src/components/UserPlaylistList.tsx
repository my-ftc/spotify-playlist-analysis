// components/UserPlaylistList.tsx


import React from 'react';
import Link from 'next/link';
import { extractPlaylistId } from '@/utils/helpers';

interface Playlist {
    images: string;
    name: string;
    ownerId: string;
    external_urls: {
        spotify: string;
    };
    tracks: { length: number };
    followers: number;
}

interface UserPlaylistListProps {
    userPlaylists: Playlist[];
}

const UserPlaylistList: React.FC<UserPlaylistListProps> = ({ userPlaylists }) => {
    return (
        <div className="mt-4 bg-white p-4 shadow-lg rounded-lg xxs:w-full xs:w-1/2 xxs:text-sm xs:text-lg">
            <h2 className="font-extrabold text-black">Other playlists from user</h2>
            <p className='xxs:my-2.5 xs:my-4 text-[#515268]'>Lorem ipsum dolor sit amet consectetur. </p>

            <div className="hidden xs:grid grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-4 border-b border-gray-300 pb-2 my-4">
                <div></div>
                <div className="text-[#8789a8] text-left">Playlist name</div>
                <div className="text-[#8789a8] text-center">Songs</div>
                <div className="text-[#8789a8] text-center">Followers</div>
                <div></div>
            </div>

            <ul className='hidden xs:block'>
                {userPlaylists.map((playlist, index) => (
                    <li key={index} className="grid grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-4 items-center py-2">
                        <div className="flex justify-center">
                            <img
                                src={playlist.images || 'default-image.jpg'}
                                alt={playlist.name}
                                className="w-12 h-12 object-cover rounded-lg"
                            />
                        </div>

                        <div className="flex flex-col break-words">
                            <a
                                href={playlist.external_urls.spotify}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#373843] hover:underline font-semibold"
                            >
                                {playlist.name}
                            </a>
                            <div className="text-[#8789a8]">{playlist.ownerId}</div>
                        </div>

                        <div className="text-center text-gray-600 break-words">{playlist.tracks.length}</div>

                        <div className="text-center text-gray-600 break-words">{playlist.followers}</div>

                        <div className="text-center">
                            <Link
                                href={`/playlist/${extractPlaylistId(playlist.external_urls.spotify)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center text-[#1d4a5d] font-semibold hover:underline xs:text-sm sm:text-sm md:text-base lg:text-base"
                            >
                                <img
                                    src="/images/analyze.png"
                                    alt="Analyze"
                                    className="xs:w-3 sm:w-3 md:w-4 lg:w-4 h-auto mr-2"
                                />
                                Analyze
                            </Link>
                        </div>
                    </li>
                ))}
            </ul>

            <ul>
                {userPlaylists.map((playlist, index) => (
                    <li key={index} className="py-3">
                        <div className="flex flex-row items-center">
                            <div className="flex justify-center">
                                <img
                                    src={playlist.images || 'default-image.jpg'}
                                    alt={playlist.name}
                                    className="w-14 h-auto object-cover rounded-lg"
                                />
                            </div>
                            <div className='flex flex-col space-y-0.5 ml-2'>
                                <div className="flex flex-col break-words">
                                    <a
                                        href={playlist.external_urls.spotify}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[#373843] hover:underline font-semibold"
                                    >
                                        {playlist.name}
                                    </a>
                                    <div className="text-[#8789a8]">{playlist.ownerId}</div>
                                </div>

                                <div className="flex flex-row space-x-4 text-xs">
                                    <div className="flex items-center">
                                        <img
                                            src="/images/music-note-02.png"
                                            alt="Songs"
                                            className="w-3 h-auto mr-1"
                                        />
                                        <span className="text-gray-600">{playlist.tracks.length} songs</span>
                                    </div>
                                    <div className="flex items-center">
                                        <img
                                            src="/images/users-01.png"
                                            alt="Followers"
                                            className="w-3 h-auto mr-1"
                                        />
                                        <span className="text-gray-600">{playlist.followers} followers</span>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col ml-auto mr-1.5 space-y-2'>
                                <div className="text-center">
                                    <Link
                                        href={`/playlist/${extractPlaylistId(playlist.external_urls.spotify)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center text-[#1d4a5d] font-semibold hover:underline xs:text-sm sm:text-sm md:text-base lg:text-base"
                                    >
                                        <img
                                            src="/images/analyze.png"
                                            alt="Analyze"
                                            className="xs:w-3 sm:w-3 md:w-4 lg:w-4 h-auto mr-2"
                                        />
                                        Analyze
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserPlaylistList;
