/*
  Warnings:

  - You are about to drop the column `ratingId` on the `UserSkill` table. All the data in the column will be lost.
  - You are about to drop the `Rating` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `Skill` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `rating` to the `UserSkill` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserSkill" DROP CONSTRAINT "UserSkill_ratingId_fkey";

-- AlterTable
ALTER TABLE "UserSkill" DROP COLUMN "ratingId",
ADD COLUMN     "rating" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Rating";

-- CreateIndex
CREATE UNIQUE INDEX "Skill_name_key" ON "Skill"("name");
