// pages/api/storeFollowerCount.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { createPlaylistRow } from '../../lib/createPlaylistRow';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { playlistId } = req.body;

    if (!playlistId) {
      return res.status(400).json({ message: 'Playlist ID is required.' });
    }

    try {
      // Insert the playlist with an empty follower_count array if it does not exist
      const result = await createPlaylistRow(playlistId);

      if (result) {
        return res.status(201).json({ message: 'Playlist inserted with empty follower count array.' });
      } else {
        return res.status(409).json({ message: 'Playlist already exists in the database.' });
      }
    } catch (error) {
      console.error('Error storing follower count:', error); // Log the error
      return res.status(500).json({ message: 'Error storing follower count.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
