/*
  Warnings:

  - Changed the type of `state` on the `work_orders` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "work_orders" DROP COLUMN "state",
ADD COLUMN     "state" INTEGER NOT NULL;
