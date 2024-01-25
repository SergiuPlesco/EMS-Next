/*
  Warnings:

  - A unique constraint covering the columns `[name,userId,skillId]` on the table `UserSkill` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserSkill_name_userId_skillId_key" ON "UserSkill"("name", "userId", "skillId");
