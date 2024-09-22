// pages/api/getFollowerCountArray.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { playlistId } = req.query;

  if (!playlistId) {
    return res.status(400).json({ message: 'Playlist ID is required' });
  }

  try {
    const record = await prisma.followers.findUnique({
      where: { playlist_id: String(playlistId) },
    });

    if (!record) {
      return res.status(404).json({ message: 'Record not found' });
    }

    return res.status(200).json({ followerCountArray: record.follower_count });
  } catch (error) {
    console.error('Error fetching follower count array:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
