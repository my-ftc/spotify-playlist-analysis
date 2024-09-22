// src/lib/localStorageUtils.ts

const PLAYLIST_SEARCHES_KEY = "playlistSearches";

// Interface for storing playlist search details
interface PlaylistSearch {
  name: string;
  url: string;
}

// Retrieve searches from local storage
export const getPreviousSearches = (): PlaylistSearch[] => {
  const storedSearches = localStorage.getItem(PLAYLIST_SEARCHES_KEY);
  return storedSearches ? JSON.parse(storedSearches) : [];
};

// Store a new playlist search (name and URL) in local storage
export const storePlaylistSearch = (name: string, url: string) => {
  const previousSearches = getPreviousSearches();
  
  // Check if the search already exists by URL
  const isSearchExists = previousSearches.some(
    (search) => search.url === url
  );

  if (!isSearchExists) {
    const updatedSearches = [...previousSearches, { name, url }];
    localStorage.setItem(PLAYLIST_SEARCHES_KEY, JSON.stringify(updatedSearches));
  } else {
    console.log("Search with this URL already exists.");
  }
};

// Clear the search history from local storage
export const clearSearchHistory = () => {
  localStorage.removeItem(PLAYLIST_SEARCHES_KEY);
};
