-- DropForeignKey
ALTER TABLE "Music" DROP CONSTRAINT "Music_playlistId_fkey";

-- AlterTable
ALTER TABLE "Music" ALTER COLUMN "playlistId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Music" ADD CONSTRAINT "Music_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "Playlist"("id") ON DELETE SET NULL ON UPDATE CASCADE;
