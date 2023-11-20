/*
  Warnings:

  - Added the required column `unitaryPrice` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "unitaryPrice" BIGINT NOT NULL,
ALTER COLUMN "cost" SET DATA TYPE BIGINT;

-- AlterTable
ALTER TABLE "Service" ALTER COLUMN "price" SET DATA TYPE BIGINT;

-- AlterTable
ALTER TABLE "budget_details" ALTER COLUMN "unitaryPrice" SET DATA TYPE BIGINT;

-- CreateTable
CREATE TABLE "Invoice" (
    "id" BIGSERIAL NOT NULL,
    "clientId" INTEGER NOT NULL,
    "invoiceStampingId" INTEGER NOT NULL,
    "stamping" BIGINT NOT NULL,
    "ruc" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "state" INTEGER NOT NULL,
    "totalAmount" BIGINT NOT NULL,
    "totalIVA0" BIGINT NOT NULL,
    "totalIVA5" BIGINT NOT NULL,
    "totalIVA10" BIGINT NOT NULL,
    "totalIVA" BIGINT NOT NULL,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvoiceDetail" (
    "id" BIGSERIAL NOT NULL,
    "invoiceId" BIGINT NOT NULL,
    "concept" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitaryPrice" BIGINT NOT NULL,
    "productId" BIGINT,
    "serviceId" BIGINT,
    "iva0" BIGINT NOT NULL,
    "iva5" BIGINT NOT NULL,
    "iva10" BIGINT NOT NULL,
    "invoiceType" INTEGER NOT NULL,

    CONSTRAINT "InvoiceDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvoiceStamping" (
    "id" SERIAL NOT NULL,
    "workShopBranchId" BIGINT NOT NULL,
    "branchCode" TEXT NOT NULL,
    "pointCode" TEXT NOT NULL,
    "start" BIGINT NOT NULL,
    "end" BIGINT NOT NULL,
    "current" BIGINT NOT NULL,
    "validUntil" TEXT NOT NULL,
    "ruc" TEXT NOT NULL,

    CONSTRAINT "InvoiceStamping_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_invoiceStampingId_fkey" FOREIGN KEY ("invoiceStampingId") REFERENCES "InvoiceStamping"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoiceDetail" ADD CONSTRAINT "InvoiceDetail_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoiceDetail" ADD CONSTRAINT "InvoiceDetail_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoiceDetail" ADD CONSTRAINT "InvoiceDetail_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoiceStamping" ADD CONSTRAINT "InvoiceStamping_workShopBranchId_fkey" FOREIGN KEY ("workShopBranchId") REFERENCES "work_shop_branches"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
