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

  if (error != null) {
    console.log('Error: ', error)
  }

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
      <div className="flex-grow top-0 left-0 right-0 mx-24 my-2p z-10">
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
              <div className="mt-2p flex space-x-2">
                <div className="w-3/4 pr-4">
                  <h2 className="font-extrabold text-black">Recently checked</h2>
                  <p className="text-[#636588] mt-3">Latest playlists that have been analysed.</p>

                  <div className="bg-white p-4 rounded-lg shadow-md mt-4">
                    {/* Column Headings */}
                    <div className="grid grid-cols-12 text-left border-b border-gray-300 pb-2">
                      <div className="col-span-5 text-[#8789a8]">Playlist</div>
                      <div className="col-span-1 text-center text-[#8789a8]">Songs</div>
                      <div className="col-span-2 text-center text-[#8789a8]">Followers</div>
                      <div className="col-span-2 text-center text-[#8789a8]">Checked</div>
                      <div className="col-span-2 text-center text-[#8789a8]">Status</div>
                    </div>

                    <ul>
                      {paginatedSearches.map((search, index) => (
                        <li key={index} className="grid grid-cols-12 gap-4 py-4">
                          {/* Playlist Image and Name */}
                          <div className="col-span-5 flex items-center">
                            <img
                              src={search.image || "default-image.jpg"}
                              alt={search.name}
                              className="w-12 h-12 object-cover rounded-lg mr-3"
                            />
                            <div>
                              <a href={search.url} target="_blank" rel="noopener noreferrer" className="text-[#373843] hover:underline font-semibold">
                                {search.name}
                              </a>
                              <div className="text-[#8789a8]">{search.ownerId}</div>
                            </div>
                          </div>

                          {/* Songs */}
                          <div className="col-span-1 flex items-center justify-center text-gray-600">
                            {search.tracks}
                          </div>

                          {/* Followers */}
                          <div className="col-span-2 flex items-center justify-center text-gray-600">
                            {search.followers}
                          </div>

                          {/* Checked */}
                          <div className="col-span-2 flex items-center justify-center text-gray-600">
                            {timeSince(search.date)}
                          </div>

                          {/* Status with green background */}
                          <div className="col-span-2 flex items-center justify-center bg-[#eefaf0] px-2 rounded-lg">
                            <img src="/images/safe-logo.png" alt="Safe Icon" className="w-4 h-5 mr-2" />
                            <span className="text-[#0a0f26] font-semibold">Safe</span>
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



                <div className="w-1/4 bg-[#0a0f26] p-5 rounded-lg shadow-md text-lg">
                  {/* First Heading and Text */}
                  <h2 className="font-extrabold text-white">How does it work</h2>
                  <p className="text-[#c0c0c0] mt-2">
                    Use our Spotify playlist bot checker to spot fake activity. Analyze streams, likes, and followers for bot signs. Enter playlist URL for a scan on engagement and interactions. Get a report in minutes.
                  </p>

                  {/* Divider Line */}
                  <hr className="my-4 border-[#374151]" />

                  {/* Outcomes Section */}
                  <h2 className="font-extrabold text-white">Outcomes</h2>

                  {/* Sub-heading 1: Issues detected */}
                  <div className="flex items-center mt-3">
                    <img src="/images/issues-logo.png" alt="Issues Logo" className="w-5 h-6 mr-2" />
                    <h3 className="font-bold text-white">Issues detected</h3>
                  </div>
                  <p className="text-[#c0c0c0] mt-1">
                    Tool found odd patterns in playlist engagement, hinting at bots or manipulated metrics. Act now to investigate and fix to uphold playlist integrity.
                  </p>

                  {/* Sub-heading 2: Inconclusive */}
                  <div className="flex items-center mt-4">
                    <img src="/images/inconclusive-logo.png" alt="Inconclusive Logo" className="w-5 h-7 mr-2" />
                    <h3 className="font-bold text-white">Inconclusive</h3>
                  </div>
                  <p className="text-[#c0c0c0] mt-1">
                    Results unclear, insufficient data to categorize playlist confidently. No definitive signs of bot activity, but recommend further monitoring or analysis.
                  </p>

                  {/* Sub-heading 3: Safe */}
                  <div className="flex items-center mt-4">
                    <img src="/images/safe-logo.png" alt="Safe Logo" className="w-5 h-7 mr-2" />
                    <h3 className="font-bold text-white">Safe</h3>
                  </div>
                  <p className="text-[#c0c0c0] mt-1">
                    No suspicious activity detected. Playlist&#39;s growth and engagement seem authentic, no sign of bot involvement. Keep promoting with confidence.
                  </p>
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
                <h2 className="font-bold text-[#1d4a5d]">Playlist Report</h2>
              </div>
              <h6 className="font-extrabold mt-4 text-black text-2xl">Playlist Report</h6>

              {/* Playlist Image and Details */}
              <div className="flex items-center mt-4">
                <img
                  src={image!}
                  alt="Playlist"
                  className="w-32 h-32 object-cover rounded-lg mr-4"
                />
                <div className="flex-1">
                  <div className='flex flex-row space-x-4'>
                    <div className="text-lg font-semibold text-black">{name}</div>
                    <div className="flex items-center justify-center bg-[#eefaf0] px-4 py-1 rounded-md">
                      <img src="/images/safe-logo.png" alt="Safe Icon" className="w-4 h-5 mr-2" />
                      <span className="text-[#0a0f26] font-semibold">This playlist is safe</span>
                    </div>
                  </div>
                  <div className='flex flex-row space-x-4'>
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
                  <div className='mt-2 text-[#373843]'>There is a low chance that this playlist is botted.</div>
                  <div className='flex mt-2'>
                    <div className="flex items-center justify-center bg-[#eff5f7] px-4 py-1 rounded-md">
                      <img src="/images/open.png" alt="Safe Icon" className="w-4 h-4 mr-2" />
                      <span className="text-[#1d4a5d] font-semibold">Open on Spotify</span>
                    </div>
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

                  {/* Header with adjusted column sizes */}
                  <div className="grid grid-cols-[0.5fr_2fr_1fr_1fr] gap-4 border-b border-gray-300 pb-2 my-4">
                    <div className=""></div>
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
                            src={playlist.images || "default-image.jpg"}
                            alt={playlist.name}
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                        </div>

                        <div className="flex flex-col break-words">
                          <a href={playlist.external_urls.spotify} target="_blank" rel="noopener noreferrer" className="text-[#373843] hover:underline font-semibold">
                            {playlist.name}
                          </a>
                          <div className="text-[#8789a8]">{playlist.ownerId}</div>
                        </div>

                        <div className="text-center text-gray-600 break-words">
                          {playlist.tracks.length}
                        </div>

                        <div className="text-center text-gray-600 break-words">
                          {playlist.followers}
                        </div>
                      </li>
                    ))}
                  </ul>
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
          className="w-screen object-cover h-auto"
        />

        <div className="absolute bottom-0 left-0 right-0 z-20 text-white flex bg-transparent mx-24 underline space-x-48 mb-3p h-3/4 overflow-hidden">
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
