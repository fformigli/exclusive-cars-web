/*
  Warnings:

  - Added the required column `category` to the `permissions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "permissions" ADD COLUMN     "category" TEXT NOT NULL;
