/*
  Warnings:

  - Made the column `sellerId` on table `Chat` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."Chat" DROP CONSTRAINT "Chat_sellerId_fkey";

-- AlterTable
ALTER TABLE "public"."Chat" ALTER COLUMN "sellerId" SET NOT NULL,
ALTER COLUMN "sellerId" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "public"."Chat" ADD CONSTRAINT "Chat_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "public"."Sellers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
