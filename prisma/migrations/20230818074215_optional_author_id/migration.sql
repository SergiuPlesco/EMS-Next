-- DropForeignKey
ALTER TABLE "Skill" DROP CONSTRAINT "Skill_authorId_fkey";

-- AlterTable
ALTER TABLE "Skill" ALTER COLUMN "authorId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Skill" ADD CONSTRAINT "Skill_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
