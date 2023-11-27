/*
  Warnings:

  - Made the column `positionId` on table `UserPosition` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "UserPosition" DROP CONSTRAINT "UserPosition_positionId_fkey";

-- AlterTable
ALTER TABLE "UserPosition" ALTER COLUMN "positionId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "UserPosition" ADD CONSTRAINT "UserPosition_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "Position"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
