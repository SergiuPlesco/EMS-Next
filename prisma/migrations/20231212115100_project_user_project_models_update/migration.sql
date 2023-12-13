/*
  Warnings:

  - You are about to drop the column `description` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Project` table. All the data in the column will be lost.
  - Added the required column `description` to the `UserProject` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "description",
DROP COLUMN "endDate",
DROP COLUMN "startDate";

-- AlterTable
ALTER TABLE "UserProject" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "endDate" TIMESTAMP(3),
ADD COLUMN     "startDate" TIMESTAMP(3);
