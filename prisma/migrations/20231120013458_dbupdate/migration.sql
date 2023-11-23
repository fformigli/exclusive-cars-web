/*
  Warnings:

  - Added the required column `closed` to the `Invoice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Invoice" ADD COLUMN     "closed" BOOLEAN NOT NULL;
