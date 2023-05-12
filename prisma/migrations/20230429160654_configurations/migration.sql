/*
  Warnings:

  - Made the column `documentTypeId` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_documentTypeId_fkey";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "documentTypeId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_documentTypeId_fkey" FOREIGN KEY ("documentTypeId") REFERENCES "configurations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
