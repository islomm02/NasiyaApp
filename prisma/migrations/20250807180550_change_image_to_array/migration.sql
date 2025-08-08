/*
  Warnings:

  - The `image` column on the `ImagesOfDebts` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "public"."ImagesOfDebts" DROP COLUMN "image",
ADD COLUMN     "image" TEXT[];
