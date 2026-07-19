/*
  Warnings:

  - The `salaryExpectation` column on the `Candidate` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Candidate" DROP COLUMN "salaryExpectation",
ADD COLUMN     "salaryExpectation" INTEGER;
