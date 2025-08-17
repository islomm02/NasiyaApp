/*
  Warnings:

  - You are about to drop the column `messageId` on the `Chat` table. All the data in the column will be lost.
  - You are about to drop the column `sellerId` on the `Payments` table. All the data in the column will be lost.
  - Added the required column `chatId` to the `Messages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `message` to the `Messages` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Chat" DROP CONSTRAINT "Chat_messageId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Payments" DROP CONSTRAINT "Payments_sellerId_fkey";

-- AlterTable
ALTER TABLE "public"."Chat" DROP COLUMN "messageId";

-- AlterTable
ALTER TABLE "public"."Messages" ADD COLUMN     "chatId" TEXT NOT NULL,
ADD COLUMN     "message" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Payments" DROP COLUMN "sellerId";

-- AddForeignKey
ALTER TABLE "public"."Messages" ADD CONSTRAINT "Messages_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "public"."Chat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
