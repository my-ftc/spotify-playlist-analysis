// lib/updateFollower.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const updateFollower = async (playlistId: string, followerCount: number) => {
  try {
    // Update the existing record by appending the follower count and updated time to follower_data
    await prisma.followers.update({
      where: { playlist_id: playlistId },
      data: {
        follower_count: {
          push: {
            count: followerCount,        // The new follower count
            updated_time: new Date(),    // The current timestamp
          },
        },
        created_at: new Date(), // Update the timestamp (optional)
      },
    });
    console.log(`Follower count updated for playlist: ${playlistId}`);
  } catch (error) {
    console.error('Error updating follower count record:', error);
    throw error;
  }
};
