// lib/createPlaylistRow.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createPlaylistRow = async (playlistId: string, followerCount: number) => {
  try {
    const existingRecord = await prisma.followers.findUnique({
      where: { playlist_id: playlistId },
    });

    if (!existingRecord) {
      await prisma.followers.create({
        data: {
          playlist_id: playlistId,
          follower_count: [{ count: followerCount, updated_time: new Date() }],
          created_at: new Date(),
        },
      });
      console.log(`New playlist added: ${playlistId} with initial follower count ${followerCount}.`);
      return true;
    }

    console.log(`Playlist already exists: ${playlistId}, no action taken.`);
    return false;

  } catch (error) {
    console.error('Error in createPlaylistRow:', error);
    throw error;
  }
};
