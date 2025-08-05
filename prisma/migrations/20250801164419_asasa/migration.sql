/*
  Warnings:

  - The `term` column on the `Debt` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "public"."DebtsStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- AlterTable
ALTER TABLE "public"."Debt" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "monthlyPayment" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "remainingAmount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "startingTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "status" "public"."DebtsStatus" NOT NULL DEFAULT 'ACTIVE',
ADD COLUMN     "summaryAmount" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "term",
ADD COLUMN     "term" INTEGER;

-- AlterTable
ALTER TABLE "public"."Sellers" ADD COLUMN     "balance" INTEGER DEFAULT 0;

-- CreateTable
CREATE TABLE "public"."Terms" (
    "id" TEXT NOT NULL,
    "term" TEXT NOT NULL,

    CONSTRAINT "Terms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Region" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Region_pkey" PRIMARY KEY ("id")
);
