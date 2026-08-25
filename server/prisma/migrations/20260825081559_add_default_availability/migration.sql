/*
  Warnings:

  - Made the column `availability` on table `Candidate` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Candidate" ALTER COLUMN "availability" SET NOT NULL,
ALTER COLUMN "availability" SET DEFAULT true;
