// pages/api/updateFollowerCounts.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { updateFollower } from '../../lib/updateFollower';
import { getAccessToken, fetchPlaylistData } from '../../lib/spotify';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Accept both GET and POST
  if (req.method === 'POST' || req.method === 'GET') {
    try {
      const accessToken = await getAccessToken();

      // Fetch all playlists from the database
      const playlists = await prisma.followers.findMany({
        select: { playlist_id: true },
      });

      for (const playlist of playlists) {
        const playlistData = await fetchPlaylistData(playlist.playlist_id, accessToken);
        const followerCount = playlistData?.followers ?? 0; // Ensure followerCount is never null

        // Use insertFollowerCount to add a new record for each playlistId
        await updateFollower(playlist.playlist_id, followerCount);
      }

      console.log('Follower counts updated successfully.');
      return res.status(200).json({ message: 'Follower counts updated successfully.' });
    } catch (error) {
      console.error('Error updating follower counts:', error);
      return res.status(500).json({ message: 'Error updating follower counts.' });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
