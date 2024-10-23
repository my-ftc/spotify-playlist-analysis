// components/UserPlaylistList.tsx
import React from 'react';

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
        <div className="mt-4 bg-white p-4 shadow-lg rounded-lg w-1/2">
            <h2 className="font-extrabold text-black">Other playlists from user</h2>

            {/* Header with adjusted column sizes */}
            <div className="grid grid-cols-[0.5fr_2fr_1fr_1fr] gap-4 border-b border-gray-300 pb-2 my-4">
                <div></div>
                <div className="text-[#8789a8] text-left">Playlist name</div>
                <div className="text-[#8789a8] text-center">Songs</div>
                <div className="text-[#8789a8] text-center">Followers</div>
            </div>

            {/* List of playlists */}
            <ul>
                {userPlaylists.map((playlist, index) => (
                    <li key={index} className="grid grid-cols-[0.5fr_2fr_1fr_1fr] gap-4 items-center py-2">
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
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserPlaylistList;
