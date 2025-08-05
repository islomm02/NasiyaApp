/*
  Warnings:

  - Added the required column `month` to the `Payments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Debt" ADD COLUMN     "remainingMonths" INTEGER;

-- AlterTable
ALTER TABLE "public"."Payments" ADD COLUMN     "month" INTEGER NOT NULL;
