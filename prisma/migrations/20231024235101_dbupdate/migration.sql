-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_workShopBranchId_fkey";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "workShopBranchId" DROP NOT NULL,
ALTER COLUMN "workShopBranchId" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_workShopBranchId_fkey" FOREIGN KEY ("workShopBranchId") REFERENCES "work_shop_branches"("id") ON DELETE SET NULL ON UPDATE CASCADE;
