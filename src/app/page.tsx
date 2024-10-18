"use client";

import { useState, useEffect } from "react";
import InputAnalyze from "../components/InputAnalyze";
import FollowerCount from "../components/FollowerCount";
import GenreChart from "../components/GenreChart";
import AgeDistributionChart from "../components/AgeDistributionChart";
import ErrorMessage from "../components/ErrorMessage";
import LoadingSpinner from "../components/LoadingSpinner";
import { extractPlaylistId } from "../lib/spotify";
import { categorizeTracksByAge } from "../lib/trackUtils";
import { getPreviousSearches, storePlaylistSearch, timeSince } from "../lib/localStorageUtils";

export default function Home() {
  const [query, setQuery] = useState("");
  const [followers, setFollowers] = useState<number | null>(null);
  const [trackCount, setTrackCount] = useState<number | null>(null);
  const [followerCountArray, setFollowerCountArray] = useState<number[]>([]);
  const [genres, setGenres] = useState<{ [genre: string]: number }>({});
  const [ageDistribution, setAgeDistribution] = useState<{ [ageGroup: string]: number }>({});
  const [error, setError] = useState<string | null>(null);
  const [showChart, setShowChart] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [userPlaylists, setUserPlaylists] = useState<any[]>([]);
  const [previousSearches, setPreviousSearches] = useState<{
    name: string,
    url: string,
    ownerId: string;
    followers: number;
    tracks: number;
    date: string;
    image: string | null;
  }[]>([]);

  useEffect(() => {
    setPreviousSearches(getPreviousSearches());
  }, []);

  const handleAnalyze = async () => {
    setError(null);
    setFollowers(null);
    setTrackCount(null);
    setFollowerCountArray([]); // Reset follower count array
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
      const tokenResponse = await fetch("/api/getAccessToken");
      if (!tokenResponse.ok) throw new Error("Failed to fetch access token");

      const playlistResponse = await fetch(`/api/fetchPlaylistData?playlistId=${playlistId}`);
      if (!playlistResponse.ok) throw new Error("Failed to fetch playlist data");
      const playlistData = await playlistResponse.json();

      setFollowers(playlistData.followers);
      setTrackCount(playlistData.tracks.length);

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
      setShowChart(true);
      storePlaylistSearch(playlistData);
    } catch (err: any) {
      setError("Error fetching playlist or artist data.");
      console.error("Error fetching playlist data:", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col bg-[#f5f9fa] min-h-screen">
      {/* Background Vector Image */}
      <div className="absolute w-full">
        <img
          src="/images/Vector.png"
          alt="Top Image"
          className="w-screen h-auto object-cover"
        />
      </div>

      {/* Parent Div for Content */}
      <div className="top-0 left-0 right-0 mx-24 my-2p z-10">
        {/* Transparent Navigation Bar */}
        <nav className="flex justify-between items-center bg-transparent">
          <div className="z-10">
            <img
              src="/images/logo-text-over-image.png"
              alt="Logo"
              className="w-full h-auto"
            />
          </div>
        </nav>

        {/* Text Section on top of the image */}
        <div className="text-left mt-15p">
          <h1 className="text-6xl font-extrabold text-white">Spotify Playlist Analyzer</h1>
          <p className="text-xl text-gray-200 mt-1p tracking-wider">Real-time analysis of playlists to check for quality, bots, and history.</p>
        </div>

        {/* Search Bar */}
        <InputAnalyze query={query} setQuery={setQuery} handleAnalyze={handleAnalyze} />

        {loading && <LoadingSpinner />}
        {!loading && followers !== null && trackCount !== null && (
          <div className="text-center">
            <FollowerCount followers={followers} trackCount={trackCount} followerCountArray={followerCountArray} />
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
          <div className="mt-1p">
            <h2 className="font-extrabold text-black">Recently checked</h2>
            <p className="text-[#636588]">Latest playlists that have been analysed.</p>

            {/* White background for the list */}
            <div className="bg-white p-4 rounded-lg shadow-md mt-2">

              {/* Column Headings */}
              <div className="flex justify-between items-start border-b border-gray-300 pb-2">
                {/* Empty header for the image */}
                <div className="w-16"></div> {/* Adjust width to fit the image size */}
                <div className="flex-1 text-[#8789a8]">Playlist name</div>
                <div className="flex-1 text-center text-[#8789a8]">Songs</div>
                <div className="flex-1 text-center text-[#8789a8]">Followers</div>
                <div className="flex-1 text-center text-[#8789a8]">Checked</div>
              </div>

              <ul>
                {previousSearches.map((search, index) => (
                  <li key={index} className="flex justify-between items-start py-2">

                    {/* Image Column */}
                    <div className="w-16 flex-shrink-0">
                      <img
                        src={search.image || "default-image.jpg"}
                        alt={search.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                    </div>

                    {/* Name and Owner ID Column */}
                    <div className="flex-1">
                      <a href={search.url} target="_blank" rel="noopener noreferrer" className="text-[#373843] hover:underline font-semibold">
                        {search.name}
                      </a>
                      <div className="text-[#8789a8]">{search.ownerId}</div>
                    </div>

                    {/* Songs Count Column */}
                    <div className="flex-1 text-gray-600 text-center">
                      {search.tracks}
                    </div>

                    {/* Followers Count Column */}
                    <div className="flex-1 text-gray-600 text-center">
                      {search.followers}
                    </div>

                    {/* Time Since Column */}
                    <div className="flex-1 text-gray-600 text-center">
                      {timeSince(search.date)}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}


        <ErrorMessage error={error} />
      </div>
    </div>

  );
}
