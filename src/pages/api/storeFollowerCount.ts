// pages/api/storeFollowerCount.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { upsertFollowerCount } from '../../lib/upsertFollower';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { playlistId, followerCount } = req.body;

    if (!playlistId || followerCount == null) {
      return res.status(400).json({ message: 'Playlist ID and follower count are required.' });
    }

    try {
      const result = await upsertFollowerCount(playlistId, followerCount);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(500).json({ message: 'Error storing follower count.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
