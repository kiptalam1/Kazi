/*
  Warnings:

  - You are about to drop the column `education` on the `Candidate` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Qualification" AS ENUM ('PRIMARY', 'SECONDARY', 'HIGH_SCHOOL', 'CERTIFICATE', 'DIPLOMA', 'ASSOCIATE', 'BACHELORS', 'POSTGRADUATE_DIPLOMA', 'MASTERS', 'DOCTORATE');

-- AlterTable
ALTER TABLE "Candidate" DROP COLUMN "education";

-- CreateTable
CREATE TABLE "Education" (
    "id" TEXT NOT NULL,
    "candidateId" TEXT NOT NULL,
    "schoolName" TEXT NOT NULL,
    "fieldOfStudy" TEXT,
    "qualification" "Qualification" NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Education_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Education" ADD CONSTRAINT "Education_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
