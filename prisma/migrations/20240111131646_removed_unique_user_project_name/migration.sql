/*
  Warnings:

  - You are about to drop the column `name` on the `UserProject` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "UserProject_name_key";

-- AlterTable
ALTER TABLE "UserProject" DROP COLUMN "name";
