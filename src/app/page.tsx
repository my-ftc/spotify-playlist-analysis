"use client";

import React, { useEffect, useState } from 'react';
import InputAnalyze from '../components/InputAnalyze';
import FollowerCount from '../components/FollowerCount';
import GenreChart from '../components/GenreChart';
import AgeDistributionChart from '../components/AgeDistributionChart';
import LoadingSpinner from '../components/LoadingSpinner';
import Pagination from '../components/Pagination';
import { getPreviousSearches, storePlaylistSearch, timeSince } from "../lib/localStorageUtils";
import { extractPlaylistId } from '../utils/helpers';
import { categorizeTracksByAge } from '../lib/trackUtils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import NavBar from '@/components/NavBar';

export default function Home() {
  const [query, setQuery] = useState("");
  const [name, setName] = useState("");
  const [followers, setFollowers] = useState<number | null>(null);
  const [trackCount, setTrackCount] = useState<number | null>(null);
  const [followerCountArray, setFollowerCountArray] = useState<{ count: number; updated_time: string }[]>([]);
  const [image, setImage] = useState<string | null>(null);
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

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 9;

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

      setName(playlistData.name)
      setFollowers(playlistData.followers);
      setTrackCount(playlistData.tracks.length);
      setImage(playlistData.image)

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

  const totalPages = Math.ceil(previousSearches.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedSearches = previousSearches.slice(startIndex, startIndex + itemsPerPage);

  console.log('Error: ', error)

  return (
    <div className="flex flex-col bg-[#f5f9fa] min-h-screen font-poppins">
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
        <NavBar />

        {/* Text Section on top of the image */}
        <div className="text-left mt-15p">
          <h1 className="text-6xl font-extrabold text-white">Spotify Playlist Analyzer</h1>
          <p className="text-xl text-gray-200 mt-1p tracking-wider">Real-time analysis of playlists to check for quality, bots, and history.</p>
        </div>

        {/* Conditionally render the search bar and previous searches */}
        {!showChart && (
          <>
            <InputAnalyze query={query} setQuery={setQuery} handleAnalyze={handleAnalyze} />

            {previousSearches.length > 0 && (
              <div className="mt-2p">
                <h2 className="font-extrabold text-black">Recently checked</h2>
                <p className="text-[#636588]">Latest playlists that have been analysed.</p>

                {/* White background for the list */}
                <div className="bg-white p-4 rounded-lg shadow-md mt-4">
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
                    {paginatedSearches.map((search, index) => (
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

                <div className="flex justify-end">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              </div>
            )}
          </>
        )}

        {/* Charts Section */}
        {loading && <LoadingSpinner />}
        {!loading && followers !== null && trackCount !== null && showChart && (
          <div className="mt-10">
            <div className="bg-white p-4 shadow-lg rounded-lg">
              <div className="flex items-center gap-3">
                <h2 className="text-black">Playlist Analyzer</h2>
                <FontAwesomeIcon icon={faChevronRight} />
                <h2 className="font-bold text-black">Playlist Report</h2>
              </div>
              <h6 className="text-lg font-extrabold mt-4 text-black">Playlist Report</h6>

              {/* Playlist Image and Details */}
              <div className="flex items-center mt-4">
                <img
                  src={image!}
                  alt="Playlist"
                  className="w-20 h-20 object-cover rounded-lg mr-4"
                />
                <div className="flex-1">
                  <div className="text-lg font-semibold text-black">{name}</div>
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

              </div>
            </div>

            <FollowerCount
              followers={followers}
              trackCount={trackCount}
              followerCountArray={followerCountArray}
            />

            <AgeDistributionChart ageDistribution={ageDistribution} />
            <div className='flex flex-row gap-4'>
              <GenreChart genres={genres} />
              {!loading && userPlaylists.length > 0 && (
                <div className="mt-4 bg-white p-4 shadow-lg rounded-lg w-1/2">
                  <h2 className="font-extrabold text-black">Other playlists from user</h2>
                  <div className="mt-4">
                    {userPlaylists.map((playlist) => (
                      <div key={playlist.id} className="flex flex-row items-center p-2">
                        {/* Playlist Image */}
                        <img
                          src={playlist.images || '/images/default-image.png'} // Provide a default image if none exists
                          alt={playlist.name}
                          className="w-20 h-20 object-cover rounded-lg mb-2"
                        />
                        {/* Playlist Name and Owner */}
                        <div className="text-center">
                          <a
                            href={playlist.external_urls.spotify}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-black font-semibold hover:underline"
                          >
                            {playlist.name}
                          </a>
                          <div className="text-gray-600">{playlist.ownerId}</div> {/* Display owner ID or name */}
                        </div>
                        {/* Track Count */}
                        <div className="text-gray-600 mt-2">{playlist.tracks.length}</div>
                        {/* Followers Count */}
                        <div className="text-gray-600">{playlist.followers}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        )}
      </div>

      <div className="relative w-full">
        <img
          src="/images/footer-bg.png"
          alt="Footer Image"
          className="w-screen h-auto object-cover"
        />

        {/* Footer Links Container */}
        <div className="absolute bottom-0 left-0 right-0 z-20 flex bg-transparent mx-24 underline space-x-48 mb-3p">
          {/* Left Column */}
          <div className='space-y-8'>
            <div>
              <ul className="space-y-4">
                <li><a href="#" className="hover:underline">Submit Your Music</a></li>
                <li><a href="#" className="hover:underline">How Musosoup Works</a></li>
                <li><a href="#" className="hover:underline">Our Difference</a></li>
                <li><a href="#" className="hover:underline">Preparing to Submit</a></li>
                <li><a href="#" className="hover:underline">Your Curators</a></li>
                <li><a href="#" className="hover:underline">Blog</a></li>
              </ul>
            </div>
            <div className='flex flex-row space-x-4'>
              <img
                src="/images/vector-insta.png"
                alt="Insta Logo"
              />
              <img
                src="/images/vector-x.png"
                alt="X Logo"
              />
              <img
                src="/images/vector-facebook.png"
                alt="Facebook Logo"
              />
            </div>
            <div>
              <p>&copy; 2024 Muso Ltd</p>
            </div>
            <div>
              <ul className='space-y-1'>
                <li><a href="#" className="hover:underline">Terms of Use</a></li>
                <li><a href="#" className="hover:underline">Privacy Policy</a></li>
              </ul>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col">
            <ul className="space-y-4">
              <li><a href="#" className="hover:underline">View recent music</a></li>
              <li><a href="#" className="hover:underline">#SustainableCurator</a></li>
              <li><a href="#" className="hover:underline">Contact us</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
