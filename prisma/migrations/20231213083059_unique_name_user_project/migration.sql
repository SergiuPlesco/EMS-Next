/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `UserProject` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserProject_name_key" ON "UserProject"("name");
