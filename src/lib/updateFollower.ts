// lib/updateFollower.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const updateFollower = async (playlistId: string, followerCount: number) => {
  try {
    // Update the existing record by appending to the follower_count array
    await prisma.followers.update({
      where: { playlist_id: playlistId },
      data: {
        follower_count: {
          push: followerCount, // Append the new follower count
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
