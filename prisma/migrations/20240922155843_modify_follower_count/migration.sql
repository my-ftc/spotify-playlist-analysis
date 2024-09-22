/*
  Warnings:

  - The `follower_count` column on the `Followers` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[playlist_id]` on the table `Followers` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Followers" DROP COLUMN "follower_count",
ADD COLUMN     "follower_count" INTEGER[];

-- CreateIndex
CREATE UNIQUE INDEX "Followers_playlist_id_key" ON "Followers"("playlist_id");
