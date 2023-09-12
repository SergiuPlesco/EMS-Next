/*
  Warnings:

  - You are about to drop the column `positions` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `UserPosition` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "positions";

-- AlterTable
ALTER TABLE "UserPosition" DROP COLUMN "rating";
