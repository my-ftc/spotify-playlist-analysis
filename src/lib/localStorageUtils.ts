// src/lib/localStorageUtils.ts

export const PLAYLIST_SEARCHES_KEY = "playlistSearches";

// Interface for storing playlist search details
interface PlaylistSearch {
  name: string;
  url: string;
  ownerId: string;
  ownerName: string;
  followers: number;
  tracks: number;
  date: string;
  image: string | null;
  safe: boolean;
}

// Retrieve searches from local storage, sorted by date (most recent first)
export const getPreviousSearches = (): PlaylistSearch[] => {
  const storedSearches = localStorage.getItem(PLAYLIST_SEARCHES_KEY);
  const searches: PlaylistSearch[] = storedSearches ? JSON.parse(storedSearches) : [];

  // Sort searches by date in descending order (most recent first)
  searches.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return searches;
};

// Store a new playlist search (name, URL, image) in local storage
export const storePlaylistSearch = (playlistData: any, safe: boolean) => {
  const previousSearches: PlaylistSearch[] = getPreviousSearches(); // Ensure previous searches conform to PlaylistSearch type
  const name = playlistData.name || "Unknown Playlist";
  const url = playlistData.external_urls.spotify || "#";
  const ownerId = playlistData.ownerId || "Unknown owner";
  const ownerName = playlistData.ownerName || "Unknown owner";
  const followers = playlistData.followers || 0;
  const tracks = playlistData.tracks.length || 0;
  const date = new Date().toISOString();
  const image = playlistData.image || null;  // Store the image URL

  // Check if the search already exists by URL
  const existingSearchIndex = previousSearches.findIndex(search => search.url === url);

  if (existingSearchIndex !== -1) {
    // Update the existing entry
    previousSearches[existingSearchIndex] = {
      name,
      url,
      ownerId,
      ownerName,
      followers,
      tracks,
      date,
      image,
      safe
    };
    console.log("Updated existing search entry.");
  } else {
    // Add a new entry
    previousSearches.push({
      name,
      url,
      ownerId,
      ownerName,
      followers,
      tracks,
      date,
      image,
      safe
    });
    console.log("Added new search entry.");
  }

  // Store the updated searches back in local storage
  localStorage.setItem(PLAYLIST_SEARCHES_KEY, JSON.stringify(previousSearches));
};

// Clear the search history from local storage
export const clearSearchHistory = () => {
  localStorage.removeItem(PLAYLIST_SEARCHES_KEY);
};

// Time since function to format the date
export const timeSince = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  let interval = Math.floor(seconds / 31536000);
  if (interval > 1) return `${interval}y ago`;
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) return `${interval}mo ago`;
  interval = Math.floor(seconds / 86400);
  if (interval > 1) return `${interval}d ago`;
  interval = Math.floor(seconds / 3600);
  if (interval > 1) return `${interval}h ago`;
  interval = Math.floor(seconds / 60);
  if (interval > 1) return `${interval}m ago`;
  return `${seconds}s ago`;
};
