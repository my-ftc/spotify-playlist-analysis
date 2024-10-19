/*
  Warnings:

  - The `follower_count` column on the `Followers` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Followers" DROP COLUMN "follower_count",
ADD COLUMN     "follower_count" JSONB[];
