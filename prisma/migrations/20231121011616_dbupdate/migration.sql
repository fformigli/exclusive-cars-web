/*
  Warnings:

  - You are about to drop the column `serviceId` on the `budget_details` table. All the data in the column will be lost.
  - You are about to drop the column `serviceId` on the `sale_invoice_details` table. All the data in the column will be lost.
  - You are about to drop the `PurchaseInvoice` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PurchaseInvoiceDetail` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `services` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PurchaseInvoice" DROP CONSTRAINT "PurchaseInvoice_supplierId_fkey";

-- DropForeignKey
ALTER TABLE "PurchaseInvoiceDetail" DROP CONSTRAINT "PurchaseInvoiceDetail_productId_fkey";

-- DropForeignKey
ALTER TABLE "budget_details" DROP CONSTRAINT "budget_details_serviceId_fkey";

-- DropForeignKey
ALTER TABLE "sale_invoice_details" DROP CONSTRAINT "sale_invoice_details_serviceId_fkey";

-- AlterTable
ALTER TABLE "budget_details" DROP COLUMN "serviceId";

-- AlterTable
ALTER TABLE "sale_invoice_details" DROP COLUMN "serviceId";

-- DropTable
DROP TABLE "PurchaseInvoice";

-- DropTable
DROP TABLE "PurchaseInvoiceDetail";

-- DropTable
DROP TABLE "services";

-- CreateTable
CREATE TABLE "purchase_invoices" (
    "id" BIGSERIAL NOT NULL,
    "supplierId" BIGINT NOT NULL,
    "stamping" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "purchase_invoices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "purchase_invoice_details" (
    "id" BIGSERIAL NOT NULL,
    "productId" BIGINT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "cost" BIGINT NOT NULL,
    "iva" INTEGER NOT NULL,

    CONSTRAINT "purchase_invoice_details_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "purchase_invoices" ADD CONSTRAINT "purchase_invoices_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "suppliers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchase_invoice_details" ADD CONSTRAINT "purchase_invoice_details_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
