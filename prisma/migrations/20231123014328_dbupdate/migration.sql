/*
  Warnings:

  - Added the required column `invoiceNumber` to the `sale_invoices` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sale_invoices" ADD COLUMN     "invoiceNumber" TEXT NOT NULL;
