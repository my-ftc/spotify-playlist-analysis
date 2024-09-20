// lib/spotify.ts

export const extractPlaylistId = (query: string): string | null => {
  const regex = /playlist\/([a-zA-Z0-9]+)/;
  const match = query.match(regex);
  return match ? match[1] : null;
};

export const getAccessToken = async (): Promise<string> => {
  const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ grant_type: "client_credentials" }),
  });

  if (!response.ok) {
    throw new Error("Failed to get access token");
  }

  const data = await response.json();
  return data.access_token;
};

// lib/spotify.ts

export const fetchPlaylistData = async (playlistId: string, accessToken: string) => {
  let tracks: any[] = [];
  let followersCount: number | null = null;
  let ownerId: string | null = null; // To hold the owner's user ID
  let nextUrl = `https://api.spotify.com/v1/playlists/${playlistId}`;

  const playlistResponse = await fetch(nextUrl, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!playlistResponse.ok) {
    throw new Error('Failed to fetch playlist details');
  }

  const playlistData = await playlistResponse.json();
  followersCount = playlistData.followers.total;
  ownerId = playlistData.owner.id; // Get the owner's user ID

  nextUrl = playlistData.tracks.href; // Use the href to fetch tracks

  while (nextUrl) {
    const response = await fetch(nextUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch playlist tracks');
    }

    const data = await response.json();
    tracks = tracks.concat(data.items);
    nextUrl = data.next; // Move to the next page
  }

  return {
    followers: followersCount,
    tracks,
    ownerId, // Return the owner ID
  };
};


export const fetchArtistGenres = async (artistIds: string[], accessToken: string) => {
  const genreCounts: { [genre: string]: number } = {};

  for (const artistId of artistIds) {
    const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.ok) {
      const artistData = await response.json();
      artistData.genres.forEach((genre: string) => {
        genreCounts[genre] = (genreCounts[genre] || 0) + 1;
      });
    }
  }

  return genreCounts;
};

export const fetchUsersPlaylists = async (userId: string, accessToken: string) => {
  const response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user playlists');
  }

  const data = await response.json();
  return data.items; // Return the user's playlists
};

// Helper function to split array into batches
const chunkArray = (array: any[], chunkSize: number) => {
  return array.reduce((resultArray: any[], item, index) => {
    const chunkIndex = Math.floor(index / chunkSize);
    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = []; // Start a new chunk
    }
    resultArray[chunkIndex].push(item);
    return resultArray;
  }, []);
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchWithRetry = async (fetchFunc: () => Promise<any>, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      return await fetchFunc();
    } catch (error: any) {
      if (error.response && error.response.status === 429) {
        const rateLimitReset = error.response.headers.get('X-RateLimit-Reset');

        // Log the reset time and convert it to a human-readable format
        if (rateLimitReset) {
          const resetTimestamp = parseInt(rateLimitReset, 10) * 1000; // Convert to milliseconds
          const resetTime = new Date(resetTimestamp).toLocaleTimeString();
          console.log(`Rate limited. API will reset at: ${resetTime}`);
        } else {
          console.log('Rate limit reset information not available.');
        }

        // Check for Retry-After header
        const retryAfter = error.response.headers.get('Retry-After');
        const waitTime = retryAfter ? parseInt(retryAfter, 10) * 1000 : Math.pow(2, i) * 1000; // Fallback to exponential backoff
        console.log(`Rate limited, retrying after ${waitTime / 1000} seconds`);
        await delay(waitTime); // Wait before retrying
      } else {
        throw error; // Rethrow any other error
      }
    }
  }
  throw new Error("Max retries reached for fetching data.");
};

// Batch request function with delay between batches
export const fetchArtistGenresInBatches = async (artistIds: string[], accessToken: string, batchSize = 20, delayMs = 1000) => {
  const artistChunks = chunkArray(artistIds, batchSize);
  let genreCounts: { [genre: string]: number } = {};

  for (const chunk of artistChunks) {
    try {
      const genreChunk = await fetchWithRetry(() => fetchArtistGenres(chunk, accessToken));
      genreCounts = { ...genreCounts, ...genreChunk };
    } catch (error) {
      console.error("Error fetching genre chunk", error);
    }
    await delay(delayMs); // Delay between batches to avoid rate limiting
  }

  return genreCounts;
};

