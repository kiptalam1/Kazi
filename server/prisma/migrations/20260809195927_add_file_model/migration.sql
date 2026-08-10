/*
  Warnings:

  - You are about to drop the column `resumeUrl` on the `Candidate` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[resumeId]` on the table `Candidate` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Candidate" DROP COLUMN "resumeUrl",
ADD COLUMN     "resumeId" TEXT;

-- CreateTable
CREATE TABLE "File" (
    "id" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "mimeTyoe" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "publicId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Candidate_resumeId_key" ON "Candidate"("resumeId");

-- AddForeignKey
ALTER TABLE "Candidate" ADD CONSTRAINT "Candidate_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "File"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "File"("id") ON DELETE SET NULL ON UPDATE CASCADE;
