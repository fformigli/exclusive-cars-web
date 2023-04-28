/*
  Warnings:

  - The `createdBy` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "createdBy",
ADD COLUMN     "createdBy" INTEGER;