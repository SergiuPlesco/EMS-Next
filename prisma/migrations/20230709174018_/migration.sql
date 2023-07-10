/*
  Warnings:

  - You are about to drop the column `value` on the `Skill` table. All the data in the column will be lost.
  - Added the required column `title` to the `Skill` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Skill" DROP COLUMN "value",
ADD COLUMN     "title" TEXT NOT NULL;
