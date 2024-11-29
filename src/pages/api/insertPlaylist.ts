// pages/api/storeFollowerCount.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { createPlaylistRow } from '../../lib/createPlaylistRow';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { playlistId, followerCount } = req.body;

    if (!playlistId || followerCount == null) {
      return res.status(400).json({ message: 'Playlist ID and follower count are required.' });
    }

    try {
      const result = await createPlaylistRow(playlistId, followerCount); // Pass followerCount

      if (result) {
        return res.status(201).json({ message: 'Playlist inserted with initial follower count.' });
      } else {
        return res.status(409).json({ message: 'Playlist already exists in the database.' });
      }
    } catch (error) {
      console.error('Error storing follower count:', error);
      return res.status(500).json({ message: 'Error storing follower count.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
