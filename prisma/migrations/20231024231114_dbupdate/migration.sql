/*
  Warnings:

  - You are about to drop the `WorkOrderComment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "WorkOrderComment" DROP CONSTRAINT "WorkOrderComment_createdById_fkey";

-- DropForeignKey
ALTER TABLE "WorkOrderComment" DROP CONSTRAINT "WorkOrderComment_workOrderId_fkey";

-- DropTable
DROP TABLE "WorkOrderComment";

-- CreateTable
CREATE TABLE "work_order_comments" (
    "id" BIGSERIAL NOT NULL,
    "workOrderId" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdById" INTEGER NOT NULL,

    CONSTRAINT "work_order_comments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "work_order_comments" ADD CONSTRAINT "work_order_comments_workOrderId_fkey" FOREIGN KEY ("workOrderId") REFERENCES "work_orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_order_comments" ADD CONSTRAINT "work_order_comments_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
