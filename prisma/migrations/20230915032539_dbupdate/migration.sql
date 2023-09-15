/*
  Warnings:

  - You are about to drop the column `fuelState` on the `work_orders` table. All the data in the column will be lost.
  - You are about to drop the column `vinnro` on the `work_orders` table. All the data in the column will be lost.
  - Added the required column `fuelStateId` to the `work_orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vinNumber` to the `work_orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "work_orders" DROP COLUMN "fuelState",
DROP COLUMN "vinnro",
ADD COLUMN     "fuelStateId" INTEGER NOT NULL,
ADD COLUMN     "vinNumber" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "work_orders" ADD CONSTRAINT "work_orders_fuelStateId_fkey" FOREIGN KEY ("fuelStateId") REFERENCES "configurations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
