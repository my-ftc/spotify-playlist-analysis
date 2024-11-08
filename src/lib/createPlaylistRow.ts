// lib/createPlaylistRow.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createPlaylistRow = async (playlistId: string) => {
  try {
    // Check if the playlist exists
    const existingRecord = await prisma.followers.findUnique({
      where: { playlist_id: playlistId },
    });

    if (!existingRecord) {
      // Insert a new record with an empty follower_count array
      await prisma.followers.create({
        data: {
          playlist_id: playlistId,
          follower_count: [], // Pass an empty array directly
          created_at: new Date(),
        },
      });
      console.log(`New playlist added: ${playlistId} with empty follower count array.`);
      return true;
    }

    console.log(`Playlist already exists: ${playlistId}, no action taken.`);
    return false;

  } catch (error) {
    console.error('Error in upsert:', error);
    throw error;
  }
};
