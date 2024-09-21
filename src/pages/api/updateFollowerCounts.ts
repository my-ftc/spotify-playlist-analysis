// pages/api/updateFollowerCounts.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { getAccessToken, fetchPlaylistData } from '../../lib/spotify';
import { upsertFollowerCount } from '../../lib/upsertFollower';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const accessToken = await getAccessToken();
      
      // Fetch all playlists from the database
      const playlists = await prisma.followers.findMany({
        select: { playlist_id: true },
      });

      for (const playlist of playlists) {
        const playlistData = await fetchPlaylistData(playlist.playlist_id, accessToken);
        const followerCount = playlistData?.followers ?? 0; // Ensure followerCount is never null

        // Use the upsert function to either update or insert follower count
        await upsertFollowerCount(playlist.playlist_id, followerCount);
      }

      console.log('Follower counts updated successfully.');
      return res.status(200).json({ message: 'Follower counts updated successfully.' });
    } catch (error) {
      console.error('Error updating follower counts:', error);
      return res.status(500).json({ message: 'Error updating follower counts.' });
    } finally {
      await prisma.$disconnect(); // Disconnect Prisma Client
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
