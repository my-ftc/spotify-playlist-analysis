// lib/upsertFollower.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const upsertFollowerCount = async (playlistId: string, followerCount: number) => {
  try {
    // Check if the playlist exists
    const existingRecord = await prisma.followers.findUnique({
      where: { playlist_id: playlistId },
    });

    if (existingRecord) {
      // Check if the follower count is different
      if (existingRecord.follower_count !== followerCount) {
        // Update only if the follower count is different
        await prisma.followers.update({
          where: { playlist_id: playlistId },
          data: {
            follower_count: followerCount,
            created_at: new Date(),
          },
        });
        console.log(`Follower count updated for playlist: ${playlistId}`);
      } else {
        console.log(`No update needed for playlist: ${playlistId} (same follower count)`);
      }
    } else {
      // Insert new record if it doesn't exist
      await prisma.followers.create({
        data: {
          playlist_id: playlistId,
          follower_count: followerCount,
          created_at: new Date(),
        },
      });
      console.log(`New playlist added: ${playlistId}`);
    }

  } catch (error) {
    console.error('Error in upsert:', error);
    throw error;
  }
};
