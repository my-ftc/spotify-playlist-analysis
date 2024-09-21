"use client";

import { useState, useEffect } from "react";
import InputAnalyze from "../components/InputAnalyze";
import FollowerCount from "../components/FollowerCount";
import GenreChart from "../components/GenreChart";
import AgeDistributionChart from "../components/AgeDistributionChart";
import ErrorMessage from "../components/ErrorMessage";
import LoadingSpinner from "../components/LoadingSpinner";
import { extractPlaylistId, getAccessToken, fetchPlaylistData, fetchArtistGenresInBatches, fetchUsersPlaylists } from "../lib/spotify";
import { categorizeTracksByAge } from "../lib/trackUtils";
import { getPreviousSearches, storePlaylistSearch } from "../lib/localStorageUtils";

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
  const [previousSearches, setPreviousSearches] = useState<{ name: string, url: string }[]>([]);

  // Retrieve previous searches from local storage on component mount
  useEffect(() => {
    setPreviousSearches(getPreviousSearches());
  }, []);

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

      // Store follower count in the database
      await fetch('/api/storeFollowerCount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          playlistId: playlistId,
          followerCount: playlistData.followers,
        }),
      });

      const tracks = playlistData.tracks;
      const artistIds = tracks.map((item: any) => item.track.artists[0].id);
      const ownerId = playlistData.ownerId;

      const [userPlaylists, genreCounts] = await Promise.all([
        ownerId ? fetchUsersPlaylists(ownerId, accessToken) : Promise.resolve([]),
        fetchArtistGenresInBatches(artistIds, accessToken),
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

      // Handle null values with fallback defaults
      const playlistName = playlistData.name || "Unknown Playlist"; // Fallback to 'Unknown Playlist' if null
      const playlistUrl = playlistData.external_urls.spotify || "#"; // Fallback to '#' if URL is null

      // Store the playlist name and URL in local storage
      storePlaylistSearch(playlistName, playlistUrl);
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
          <FollowerCount followers={followers} trackCount={trackCount} />
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
          <h2>User&#39;s Other Playlists:</h2>
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
      {previousSearches.length > 0 && (
        <div>
          <h2>Previous Playlist Searches:</h2>
          <ul>
            {previousSearches.map((search, index) => (
              <li key={index}>
                <a href={search.url} target="_blank" rel="noopener noreferrer">
                  {search.name}
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
