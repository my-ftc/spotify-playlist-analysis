"use client";

import React, { useEffect, useState } from 'react';
import PlaylistOverview from '@/components/PlaylistOverview';
import FollowerCount from '@/components/FollowerCount';
import GenreChart from '@/components/GenreChart';
import AgeDistributionChart from '@/components/AgeDistributionChart';
import UserPlaylistList from '@/components/UserPlaylistList';
import MainLayout from '@/components/MainLayout';
import { useParams } from 'next/navigation';
import { categorizeTracksByAge } from '../../../lib/trackUtils';
import { storePlaylistSearch } from "../../../lib/localStorageUtils";
import LoadingWave from '@/components/LoadingWave';
import { detectAnomaly } from '../../../utils/followersAnomalyDetection';

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
    const [loading, setLoading] = useState<boolean>(true);
    const [userPlaylists, setUserPlaylists] = useState<any[]>([]);
    const [url, setUrl] = useState("");
    const [isInitialLoadDone, setIsInitialLoadDone] = useState<boolean>(false);
    const [isAnomalyDetected, setIsAnomalyDetected] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsInitialLoadDone(true);
        });

        const analyzePlaylist = async () => {
            setError(null);
            setFollowers(null);
            setTrackCount(null);
            setFollowerCountArray([]);
            setGenres({});
            setAgeDistribution({});
            setUserPlaylists([]);

            const playlistId = params?.playlistId;

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
                setUrl(playlistData.external_urls.spotify);

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
                    ownerId ? fetch(`/api/fetchUserPlaylists?userId=${ownerId}&playlistId=${playlistId}`) : Promise.resolve(null),
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

                const isXXS = typeof window !== 'undefined' && window.innerWidth < 1000;
                const ageDistribution = categorizeTracksByAge(tracks, isXXS);
                setAgeDistribution(ageDistribution);
                storePlaylistSearch(playlistData, !isAnomalyDetected);
            } catch (err: any) {
                setError("Error fetching playlist or artist data.");
                console.error("Error fetching playlist data:", err.message);
            } finally {
                setLoading(false);
            }
        };

        analyzePlaylist();
        return () => clearTimeout(timer);
    }, [isAnomalyDetected]);

    // Second useEffect: For anomaly detection
    useEffect(() => {
        if (followers !== null && followerCountArray.length > 0) {
            const updatedFollowerCountArray = [
                ...followerCountArray,
                {
                    count: followers,
                    updated_time: new Date().toISOString(), // Current time for updated_time
                }
            ];
            const anomaly = detectAnomaly(updatedFollowerCountArray);
            if (anomaly != isAnomalyDetected) {
                setIsAnomalyDetected(anomaly);
            }
        }
    }, [followers, followerCountArray]);

    return (
        <MainLayout>
            {loading || !isInitialLoadDone ? (
                <LoadingWave />
            ) : (
                <div className="mt-10 3xs:mx-1 xs:mx-0">
                    {error && <div className="text-red-500">{error}</div>}
                    <PlaylistOverview
                        image={image}
                        name={name}
                        trackCount={trackCount ?? 0}
                        followers={followers ?? 0}
                        url={url}
                        isAnomalyDetected={isAnomalyDetected}
                    />
                    <FollowerCount
                        followers={followers}
                        trackCount={trackCount}
                        followerCountArray={followerCountArray}
                        isAnomalyDetected={isAnomalyDetected}
                    />
                    <AgeDistributionChart ageDistribution={ageDistribution} />
                    <div className='flex 3xs:flex-col sm:flex-row sm:space-x-4'>
                        <GenreChart genres={genres} />
                        {userPlaylists.length > 0 && (
                            <UserPlaylistList userPlaylists={userPlaylists} />
                        )}
                    </div>
                </div>
            )}
        </MainLayout>
    );
};

export default ChartPage;
