-- DropForeignKey
ALTER TABLE "UserPosition" DROP CONSTRAINT "UserPosition_userId_fkey";

-- AlterTable
ALTER TABLE "UserPosition" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "UserPosition" ADD CONSTRAINT "UserPosition_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
