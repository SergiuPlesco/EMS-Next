-- CreateEnum
CREATE TYPE "Availability" AS ENUM ('FULLTIME', 'PARTTIME', 'NOTAVAILABLE');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "availability" "Availability" NOT NULL DEFAULT 'FULLTIME';
