"use client";

import React, { useEffect, useState } from 'react';
import PlaylistOverview from '../../../components/PlaylistOverview';
import FollowerCount from '../../../components/FollowerCount';
import GenreChart from '../../../components/GenreChart';
import AgeDistributionChart from '../../../components/AgeDistributionChart';
import UserPlaylistList from '../../../components/UserPlaylistList';
import LoadingSpinner from '../../../components/LoadingSpinner';
import MainLayout from '@/components/MainLayout';
import { useParams } from 'next/navigation';
import { categorizeTracksByAge } from '../../../lib/trackUtils';
import { storePlaylistSearch } from "../../../lib/localStorageUtils";

const ChartPage = () => {
    const params = useParams();
    const [name, setName] = useState("");
    const [followers, setFollowers] = useState<number | null>(null);
    const [trackCount, setTrackCount] = useState<number | null>(null);
    const [followerCountArray, setFollowerCountArray] = useState<{ count: number; updated_time: string }[]>([]);
    const [image, setImage] = useState<string | null>(null);
    const [genres, setGenres] = useState<{ [genre: string]: number }>({});
    const [ageDistribution, setAgeDistribution] = useState<{ [ageGroup: string]: number }>({});
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [userPlaylists, setUserPlaylists] = useState<any[]>([]);

    useEffect(() => {
        const analyzePlaylist = async () => {
            setError(null);
            setFollowers(null);
            setTrackCount(null);
            setFollowerCountArray([]);
            setGenres({});
            setAgeDistribution({});
            setUserPlaylists([]);
            setLoading(true);

            const playlistId = params?.playlistId;

            console.log(playlistId)

            if (!playlistId) {
                setError("Please enter a valid Spotify playlist URL or ID.");
                setLoading(false);
                return;
            }

            try {
                const tokenResponse = await fetch("/api/getAccessToken");
                if (!tokenResponse.ok) throw new Error("Failed to fetch access token");

                const playlistResponse = await fetch(`/api/fetchPlaylistData?playlistId=${playlistId}`);
                if (!playlistResponse.ok) throw new Error("Failed to fetch playlist data");
                const playlistData = await playlistResponse.json();

                setName(playlistData.name);
                setFollowers(playlistData.followers);
                setTrackCount(playlistData.tracks.length);
                setImage(playlistData.image);

                // Fetch follower count array from the new API
                const followerCountResponse = await fetch(`/api/getFollowerCountArray?playlistId=${playlistId}`);
                if (followerCountResponse.ok) {
                    const { followerCountArray } = await followerCountResponse.json();
                    setFollowerCountArray(followerCountArray); // Set the follower count array
                }

                await fetch("/api/insertPlaylist", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        playlistId: playlistId,
                        followerCount: playlistData.followers,
                    }),
                });

                const tracks = playlistData.tracks;
                const artistIds = tracks.map((item: any) => item.track.artists[0].id);
                const ownerId = playlistData.ownerId;

                const [userPlaylistsResponse, genreCountsResponse] = await Promise.all([
                    ownerId ? fetch(`/api/fetchUserPlaylists?userId=${ownerId}`) : Promise.resolve(null),
                    fetch(`/api/fetchArtistGenres?artistIds=${artistIds.join(",")}`),
                ]);

                if (ownerId && userPlaylistsResponse && userPlaylistsResponse.ok) {
                    const userPlaylistsData = await userPlaylistsResponse.json();
                    setUserPlaylists(userPlaylistsData);
                } else {
                    setError("Owner ID is not available for this playlist.");
                }

                if (genreCountsResponse && genreCountsResponse.ok) {
                    const genreCountsData = await genreCountsResponse.json();
                    setGenres(genreCountsData);
                }

                const ageDistribution = categorizeTracksByAge(tracks);
                setAgeDistribution(ageDistribution);
                storePlaylistSearch(playlistData);

            } catch (err: any) {
                setError("Error fetching playlist or artist data.");
                console.error("Error fetching playlist data:", err.message);
            } finally {
                setLoading(false);
            }
        };

        analyzePlaylist();
    }, [params]);

    return (
        <MainLayout>
            <div className="mt-10">
                {loading && <LoadingSpinner />}
                {error && <div className="text-red-500">{error}</div>}
                <PlaylistOverview
                    image={image}
                    name={name}
                    trackCount={trackCount ?? 0}
                    followers={followers ?? 0}
                />
                <FollowerCount
                    followers={followers}
                    trackCount={trackCount}
                    followerCountArray={followerCountArray}
                />
                <AgeDistributionChart ageDistribution={ageDistribution} />
                <div className='flex flex-row gap-4'>
                    <GenreChart genres={genres} />
                    {!loading && userPlaylists.length > 0 && (
                        <UserPlaylistList
                            userPlaylists={userPlaylists}
                        />
                    )}
                </div>
            </div>
        </MainLayout>
    );
};

export default ChartPage;
