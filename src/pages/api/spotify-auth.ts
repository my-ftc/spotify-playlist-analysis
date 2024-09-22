// pages/api/spotify-auth.ts

import type { NextApiRequest, NextApiResponse } from 'next';

// Spotify token URL
const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Fetch access token using Spotify Client ID and Client Secret
    const response = await fetch(SPOTIFY_TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(
          `${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}:${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET}`
        ).toString('base64')}`,
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch access token');
    }

    const data = await response.json();
    res.status(200).json({ accessToken: data.access_token });
  } catch (error: any) {
    console.error('Error fetching access token:', error.message);
    res.status(500).json({ error: error.message });
  }
}
