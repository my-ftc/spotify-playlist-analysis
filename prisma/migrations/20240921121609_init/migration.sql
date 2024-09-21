-- CreateTable
CREATE TABLE "Followers" (
    "id" SERIAL NOT NULL,
    "playlist_id" TEXT NOT NULL,
    "follower_count" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Followers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Followers_playlist_id_key" ON "Followers"("playlist_id");
