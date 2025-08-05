-- AlterTable
ALTER TABLE "public"."Debt" ADD COLUMN     "sellerId" TEXT;

-- AlterTable
ALTER TABLE "public"."Sellers" ADD COLUMN     "refreshToken" TEXT,
ALTER COLUMN "image" SET DEFAULT '';

-- AddForeignKey
ALTER TABLE "public"."Debt" ADD CONSTRAINT "Debt_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "public"."Sellers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
