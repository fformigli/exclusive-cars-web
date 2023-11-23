/*
  Warnings:

  - You are about to drop the column `stamping` on the `purchase_invoices` table. All the data in the column will be lost.
  - Added the required column `invoiceNumber` to the `purchase_invoices` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "purchase_invoices" DROP COLUMN "stamping",
ADD COLUMN     "invoiceNumber" TEXT NOT NULL;
