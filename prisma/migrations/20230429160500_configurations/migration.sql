-- AlterTable
ALTER TABLE "users" ADD COLUMN     "documentTypeId" INTEGER;

-- CreateTable
CREATE TABLE "configurations" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "shortName" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "configurations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "configurations_type_idx" ON "configurations"("type");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_documentTypeId_fkey" FOREIGN KEY ("documentTypeId") REFERENCES "configurations"("id") ON DELETE SET NULL ON UPDATE CASCADE;
