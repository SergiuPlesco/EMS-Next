/*
  Warnings:

  - A unique constraint covering the columns `[name,userId,projectId]` on the table `UserProject` will be added. If there are existing duplicate values, this will fail.
  - Made the column `userId` on table `UserProject` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "UserProject" DROP CONSTRAINT "UserProject_userId_fkey";

-- DropIndex
DROP INDEX "UserProject_name_key";

-- AlterTable
ALTER TABLE "UserProject" ALTER COLUMN "userId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "UserProject_name_userId_projectId_key" ON "UserProject"("name", "userId", "projectId");

-- AddForeignKey
ALTER TABLE "UserProject" ADD CONSTRAINT "UserProject_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
