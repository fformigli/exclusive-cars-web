/*
  Warnings:

  - You are about to drop the `BudgetComments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Invoice` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `InvoiceDetail` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `InvoiceStamping` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Service` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Supplier` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BudgetComments" DROP CONSTRAINT "BudgetComments_budgetId_fkey";

-- DropForeignKey
ALTER TABLE "BudgetComments" DROP CONSTRAINT "BudgetComments_createdById_fkey";

-- DropForeignKey
ALTER TABLE "Invoice" DROP CONSTRAINT "Invoice_clientId_fkey";

-- DropForeignKey
ALTER TABLE "Invoice" DROP CONSTRAINT "Invoice_invoiceStampingId_fkey";

-- DropForeignKey
ALTER TABLE "InvoiceDetail" DROP CONSTRAINT "InvoiceDetail_invoiceId_fkey";

-- DropForeignKey
ALTER TABLE "InvoiceDetail" DROP CONSTRAINT "InvoiceDetail_productId_fkey";

-- DropForeignKey
ALTER TABLE "InvoiceDetail" DROP CONSTRAINT "InvoiceDetail_serviceId_fkey";

-- DropForeignKey
ALTER TABLE "InvoiceStamping" DROP CONSTRAINT "InvoiceStamping_workShopBranchId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_supplierId_fkey";

-- DropForeignKey
ALTER TABLE "budget_details" DROP CONSTRAINT "budget_details_productId_fkey";

-- DropForeignKey
ALTER TABLE "budget_details" DROP CONSTRAINT "budget_details_serviceId_fkey";

-- DropTable
DROP TABLE "BudgetComments";

-- DropTable
DROP TABLE "Invoice";

-- DropTable
DROP TABLE "InvoiceDetail";

-- DropTable
DROP TABLE "InvoiceStamping";

-- DropTable
DROP TABLE "Product";

-- DropTable
DROP TABLE "Service";

-- DropTable
DROP TABLE "Supplier";

-- CreateTable
CREATE TABLE "suppliers" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "otherContactInfo" TEXT NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "ruc" TEXT NOT NULL,

    CONSTRAINT "suppliers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "cost" BIGINT NOT NULL,
    "unitaryPrice" BIGINT NOT NULL,
    "supplierId" BIGINT,
    "category" TEXT NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "iva" INTEGER NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "services" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" BIGINT NOT NULL,
    "iva" INTEGER NOT NULL,

    CONSTRAINT "services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sale_invoices" (
    "id" BIGSERIAL NOT NULL,
    "clientId" INTEGER NOT NULL,
    "invoiceStampingId" BIGINT NOT NULL,
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
    "closed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "sale_invoices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sale_invoice_details" (
    "id" BIGSERIAL NOT NULL,
    "saleInvoiceId" BIGINT NOT NULL,
    "concept" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitaryPrice" BIGINT NOT NULL,
    "productId" BIGINT,
    "serviceId" BIGINT,
    "iva0" BIGINT NOT NULL,
    "iva5" BIGINT NOT NULL,
    "iva10" BIGINT NOT NULL,
    "invoiceType" INTEGER NOT NULL,

    CONSTRAINT "sale_invoice_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoices_stampings" (
    "id" BIGSERIAL NOT NULL,
    "workShopBranchId" BIGINT NOT NULL,
    "branchCode" TEXT NOT NULL,
    "pointCode" TEXT NOT NULL,
    "start" BIGINT NOT NULL,
    "end" BIGINT NOT NULL,
    "current" BIGINT NOT NULL,
    "validUntil" TEXT NOT NULL,
    "ruc" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "invoices_stampings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PurchaseInvoice" (
    "id" BIGSERIAL NOT NULL,
    "supplierId" BIGINT NOT NULL,
    "stamping" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PurchaseInvoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PurchaseInvoiceDetail" (
    "id" BIGSERIAL NOT NULL,
    "productId" BIGINT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "cost" BIGINT NOT NULL,
    "iva" INTEGER NOT NULL,

    CONSTRAINT "PurchaseInvoiceDetail_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "suppliers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "budget_details" ADD CONSTRAINT "budget_details_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "budget_details" ADD CONSTRAINT "budget_details_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale_invoices" ADD CONSTRAINT "sale_invoices_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale_invoices" ADD CONSTRAINT "sale_invoices_invoiceStampingId_fkey" FOREIGN KEY ("invoiceStampingId") REFERENCES "invoices_stampings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale_invoice_details" ADD CONSTRAINT "sale_invoice_details_saleInvoiceId_fkey" FOREIGN KEY ("saleInvoiceId") REFERENCES "sale_invoices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale_invoice_details" ADD CONSTRAINT "sale_invoice_details_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale_invoice_details" ADD CONSTRAINT "sale_invoice_details_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoices_stampings" ADD CONSTRAINT "invoices_stampings_workShopBranchId_fkey" FOREIGN KEY ("workShopBranchId") REFERENCES "work_shop_branches"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseInvoice" ADD CONSTRAINT "PurchaseInvoice_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "suppliers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseInvoiceDetail" ADD CONSTRAINT "PurchaseInvoiceDetail_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
