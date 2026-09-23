-- CreateEnum
CREATE TYPE "ResourceType" AS ENUM ('JOB', 'PROFILE', 'APPLICATION');

-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "resourceId" TEXT,
ADD COLUMN     "resourceType" TEXT;
