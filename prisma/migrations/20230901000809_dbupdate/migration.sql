/*
  Warnings:

  - You are about to drop the column `type` on the `configurations` table. All the data in the column will be lost.
  - Added the required column `configurationTypeId` to the `configurations` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "configurations_type_idx";

-- AlterTable
ALTER TABLE "configurations" DROP COLUMN "type",
ADD COLUMN     "configurationTypeId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "configuration_types" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "translate" TEXT NOT NULL,

    CONSTRAINT "configuration_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "work_orders" (
    "id" SERIAL NOT NULL,
    "state" TEXT NOT NULL,
    "contactPhone" TEXT NOT NULL,
    "fuelState" INTEGER NOT NULL,
    "vinnro" TEXT NOT NULL,
    "mileage" INTEGER NOT NULL,
    "clientId" INTEGER NOT NULL,
    "vehicleInformation" TEXT NOT NULL,
    "plate" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "work_orders_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "configurations_configurationTypeId_idx" ON "configurations"("configurationTypeId");

-- AddForeignKey
ALTER TABLE "configurations" ADD CONSTRAINT "configurations_configurationTypeId_fkey" FOREIGN KEY ("configurationTypeId") REFERENCES "configuration_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_orders" ADD CONSTRAINT "work_orders_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_orders" ADD CONSTRAINT "work_orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
