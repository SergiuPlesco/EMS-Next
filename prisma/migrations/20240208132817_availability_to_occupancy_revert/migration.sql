-- CreateEnum (Reversed)
CREATE TYPE "Availability" AS ENUM ('FULLTIME', 'PARTTIME', 'NOTAVAILABLE');

-- AlterTable (Reversed)
ALTER TABLE "User" DROP COLUMN "occupancy",
ADD COLUMN "availability" "Availability" NOT NULL DEFAULT 'NOTAVAILABLE';

-- DropEnum (No action needed)
