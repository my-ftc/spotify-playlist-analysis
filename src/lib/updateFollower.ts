// lib/updateFollower.ts

import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export const updateFollower = async (playlistId: string, followerCount: number) => {
  try {
    // Fetch the current follower_count array
    const existingRecord = await prisma.followers.findUnique({
      where: { playlist_id: playlistId },
      select: { follower_count: true },
    });

    // Ensure the follower_count is treated as an array
    const currentFollowerCountArray = Array.isArray(existingRecord?.follower_count)
      ? existingRecord?.follower_count
      : [];

    // Append the new follower count and timestamp to the array
    const updatedFollowerCount = [
      ...currentFollowerCountArray,
      {
        count: followerCount,
        updated_time: new Date(),
      },
    ];

    // Update the record with the new follower_count array
    await prisma.followers.update({
      where: { playlist_id: playlistId },
      data: {
        follower_count: updatedFollowerCount as Prisma.JsonArray, // Cast as JsonArray
        // created_at: new Date(), // Optional: Update created_at if needed
      },
    });

    console.log(`Follower count updated for playlist: ${playlistId}`);
  } catch (error) {
    console.error('Error updating follower count record:', error);
    throw error;
  }
};
