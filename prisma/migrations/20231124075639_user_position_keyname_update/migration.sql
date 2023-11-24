/*
  Warnings:

  - You are about to drop the column `positionsId` on the `UserPosition` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserPosition" DROP CONSTRAINT "UserPosition_positionsId_fkey";

-- AlterTable
ALTER TABLE "UserPosition" DROP COLUMN "positionsId",
ADD COLUMN     "positionId" INTEGER;

-- AddForeignKey
ALTER TABLE "UserPosition" ADD CONSTRAINT "UserPosition_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "Position"("id") ON DELETE SET NULL ON UPDATE CASCADE;
