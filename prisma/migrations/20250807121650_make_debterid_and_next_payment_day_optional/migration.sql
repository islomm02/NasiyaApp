/*
  Warnings:

  - You are about to drop the column `debtId` on the `Debters` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Debters" DROP CONSTRAINT "Debters_debtId_fkey";

-- AlterTable
ALTER TABLE "public"."Debt" ADD COLUMN     "debterId" TEXT;

-- AlterTable
ALTER TABLE "public"."Debters" DROP COLUMN "debtId";

-- AddForeignKey
ALTER TABLE "public"."Debt" ADD CONSTRAINT "Debt_debterId_fkey" FOREIGN KEY ("debterId") REFERENCES "public"."Debters"("id") ON DELETE SET NULL ON UPDATE CASCADE;
