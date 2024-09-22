// pages/api/fetchPlaylistData.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { fetchPlaylistData } from '../../lib/spotify';
import { fetchAccessToken } from './getAccessToken';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { playlistId } = req.query;

  if (!playlistId || typeof playlistId !== 'string') {
    return res.status(400).json({ message: 'Playlist ID is required' });
  }

  try {
    const accessToken = await fetchAccessToken();
    const playlistData = await fetchPlaylistData(playlistId, accessToken);
    console.log('Spotify Playlist Data:', playlistData);
    res.status(200).json(playlistData);
  } catch (error) {
    res.status(500).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
  }
}
