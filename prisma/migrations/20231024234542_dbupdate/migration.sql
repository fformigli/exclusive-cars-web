-- AlterTable
ALTER TABLE "users" ADD COLUMN     "workShopBranchId" BIGINT NOT NULL DEFAULT 1;

-- CreateTable
CREATE TABLE "work_shop_branches" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,

    CONSTRAINT "work_shop_branches_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_workShopBranchId_fkey" FOREIGN KEY ("workShopBranchId") REFERENCES "work_shop_branches"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
