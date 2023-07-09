/*
  Warnings:

  - You are about to drop the column `ratingId` on the `Skill` table. All the data in the column will be lost.
  - You are about to drop the `Rating` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Skill" DROP CONSTRAINT "Skill_ratingId_fkey";

-- AlterTable
ALTER TABLE "Skill" DROP COLUMN "ratingId",
ADD COLUMN     "rating" INTEGER NOT NULL DEFAULT 1;

-- DropTable
DROP TABLE "Rating";
