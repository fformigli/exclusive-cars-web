/*
  Warnings:

  - Made the column `workShopBranchId` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_workShopBranchId_fkey";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "workShopBranchId" SET NOT NULL,
ALTER COLUMN "workShopBranchId" SET DEFAULT 1;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_workShopBranchId_fkey" FOREIGN KEY ("workShopBranchId") REFERENCES "work_shop_branches"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
