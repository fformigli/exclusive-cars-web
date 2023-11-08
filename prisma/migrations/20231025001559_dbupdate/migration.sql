/*
  Warnings:

  - Added the required column `workShopBranchId` to the `work_orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "work_orders" ADD COLUMN     "workShopBranchId" BIGINT NOT NULL;

-- AddForeignKey
ALTER TABLE "work_orders" ADD CONSTRAINT "work_orders_workShopBranchId_fkey" FOREIGN KEY ("workShopBranchId") REFERENCES "work_shop_branches"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
