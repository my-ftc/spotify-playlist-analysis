// src/app/page.tsx

"use client"

import { useState } from "react";
import InputAnalyze from "../components/InputAnalyze";
import FollowerCount from "../components/FollowerCount";
import GenreChart from "../components/GenreChart";
import AgeDistributionChart from "../components/AgeDistributionChart";
import ErrorMessage from "../components/ErrorMessage";
import LoadingSpinner from "../components/LoadingSpinner"; // Spinner for loading state
import { extractPlaylistId, getAccessToken, fetchPlaylistData, fetchArtistGenresInBatches, fetchUsersPlaylists } from "../lib/spotify";
import { categorizeTracksByAge } from "../lib/trackUtils";

export default function Home() {
  const [query, setQuery] = useState("");
  const [followers, setFollowers] = useState<number | null>(null);
  const [trackCount, setTrackCount] = useState<number | null>(null);
  const [genres, setGenres] = useState<{ [genre: string]: number }>({});
  const [ageDistribution, setAgeDistribution] = useState<{ [ageGroup: string]: number }>({});
  const [error, setError] = useState<string | null>(null);
  const [showChart, setShowChart] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [userPlaylists, setUserPlaylists] = useState<any[]>([]);

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const fetchWithRetry = async (fetchFunc: () => Promise<any>, retries = 3) => {
    for (let i = 0; i < retries; i++) {
      try {
        return await fetchFunc();
      } catch (error: any) {
        if (error.response && error.response.status === 429) {
          // Check the Retry-After header
          const retryAfter = error.response.headers.get('Retry-After');
          const waitTime = retryAfter ? parseInt(retryAfter, 10) * 1000 : Math.pow(2, i) * 1000; // Exponential backoff if Retry-After is absent
          console.log(`Rate limited, retrying after ${waitTime / 1000} seconds`);
          await delay(waitTime); // Wait before retrying
        } else {
          throw error; // Rethrow if it's not a 429 error
        }
      }
    }
    throw new Error("Max retries reached for fetching data.");
  };


  const handleAnalyze = async () => {
    setError(null);
    setFollowers(null);
    setTrackCount(null);
    setGenres({});
    setAgeDistribution({});
    setUserPlaylists([]);
    setShowChart(false);
    setLoading(true);

    const playlistId = extractPlaylistId(query);

    if (!playlistId) {
      setError("Please enter a valid Spotify playlist URL or ID.");
      setLoading(false);
      return;
    }

    try {
      const accessToken = await getAccessToken();
      const playlistData = await fetchPlaylistData(playlistId, accessToken);
      setFollowers(playlistData.followers);
      setTrackCount(playlistData.tracks.length);

      const tracks = playlistData.tracks;
      const artistIds = tracks.map((item: any) => item.track.artists[0].id);
      const ownerId = playlistData.ownerId;

      const [userPlaylists, genreCounts] = await Promise.all([
        ownerId ? fetchUsersPlaylists(ownerId, accessToken) : Promise.resolve([]),
        fetchArtistGenresInBatches(artistIds, accessToken)
      ]);

      if (ownerId) {
        setUserPlaylists(userPlaylists);
      } else {
        setError("Owner ID is not available for this playlist.");
      }

      setGenres(genreCounts);

      const ageDistribution = categorizeTracksByAge(tracks);
      setAgeDistribution(ageDistribution);
      setShowChart(true);
    } catch (err: any) {
      setError("Error fetching playlist or artist data.");
      console.error("Error fetching playlist data:", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 gap-8">
      <InputAnalyze query={query} setQuery={setQuery} handleAnalyze={handleAnalyze} />
      {loading && <LoadingSpinner />}
      {!loading && followers !== null && trackCount !== null && (
        <div className="text-center">
          <p>Followers: {followers} | Tracks: {trackCount}</p>
        </div>
      )}
      {showChart && (
        <>
          <GenreChart genres={genres} />
          <AgeDistributionChart ageDistribution={ageDistribution} />
        </>
      )}
      {!loading && userPlaylists.length > 0 && (
        <div>
          <h2>User's Other Playlists:</h2>
          <ul>
            {userPlaylists.map((playlist) => (
              <li key={playlist.id}>
                <a href={playlist.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                  {playlist.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
      <ErrorMessage error={error} />
    </div>
  );
}
