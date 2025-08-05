/*
  Warnings:

  - The values [ACTIVE,INACTIVE] on the enum `DebtsStatus` will be removed. If these variants are still used in the database, this will fail.
  - The `message` column on the `Chat` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `sellerId` to the `Chat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."DebtsStatus_new" AS ENUM ('NOT_PAID', 'PAID');
ALTER TABLE "public"."Debt" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "public"."Debt" ALTER COLUMN "status" TYPE "public"."DebtsStatus_new" USING ("status"::text::"public"."DebtsStatus_new");
ALTER TYPE "public"."DebtsStatus" RENAME TO "DebtsStatus_old";
ALTER TYPE "public"."DebtsStatus_new" RENAME TO "DebtsStatus";
DROP TYPE "public"."DebtsStatus_old";
ALTER TABLE "public"."Debt" ALTER COLUMN "status" SET DEFAULT 'NOT_PAID';
COMMIT;

-- AlterTable
ALTER TABLE "public"."Chat" ADD COLUMN     "sellerId" TEXT NOT NULL,
DROP COLUMN "message",
ADD COLUMN     "message" TEXT[];

-- AlterTable
ALTER TABLE "public"."Debt" ALTER COLUMN "status" SET DEFAULT 'NOT_PAID';

-- AlterTable
ALTER TABLE "public"."Sellers" ADD COLUMN     "image" TEXT;

-- AddForeignKey
ALTER TABLE "public"."Chat" ADD CONSTRAINT "Chat_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "public"."Sellers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
