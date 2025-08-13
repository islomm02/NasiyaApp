-- CreateEnum
CREATE TYPE "public"."UsersRole" AS ENUM ('ADMIN', 'SUPER_ADMIN', 'SELLER', 'DEBTER');

-- CreateEnum
CREATE TYPE "public"."MessageStatus" AS ENUM ('SEND', 'NOT_SEND', 'SENDING');

-- CreateEnum
CREATE TYPE "public"."DebtsStatus" AS ENUM ('NOT_PAID', 'PAID');

-- CreateTable
CREATE TABLE "public"."Sellers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "public"."UsersRole" NOT NULL DEFAULT 'SELLER',
    "PINcode" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "balance" INTEGER DEFAULT 0,
    "image" TEXT DEFAULT '',

    CONSTRAINT "Sellers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Debters" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "sellerId" TEXT NOT NULL,
    "star" BOOLEAN DEFAULT false,
    "adress" TEXT,

    CONSTRAINT "Debters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Debt" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "term" INTEGER,
    "remainingMonths" INTEGER,
    "description" TEXT,
    "status" "public"."DebtsStatus" NOT NULL DEFAULT 'NOT_PAID',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startingTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "summaryAmount" INTEGER NOT NULL DEFAULT 0,
    "remainingAmount" INTEGER NOT NULL DEFAULT 0,
    "monthlyPayment" INTEGER NOT NULL DEFAULT 0,
    "sellerId" TEXT,
    "debterId" TEXT,
    "nextPaymentDay" TIMESTAMP(3),

    CONSTRAINT "Debt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Admin" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "role" "public"."UsersRole" NOT NULL DEFAULT 'ADMIN',

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Chat" (
    "id" TEXT NOT NULL,
    "debterId" TEXT NOT NULL,
    "sellerId" TEXT DEFAULT '',
    "messageId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Chat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Messages" (
    "id" TEXT NOT NULL,
    "debterId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "public"."MessageStatus" NOT NULL DEFAULT 'SEND',

    CONSTRAINT "Messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Payments" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "debtId" TEXT NOT NULL,
    "month" INTEGER NOT NULL,
    "sellerId" TEXT NOT NULL,

    CONSTRAINT "Payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ExampleMessages" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "sellerId" TEXT NOT NULL,

    CONSTRAINT "ExampleMessages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ImagesOfDebters" (
    "id" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "debterId" TEXT NOT NULL,

    CONSTRAINT "ImagesOfDebters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."FAQ" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,

    CONSTRAINT "FAQ_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ImagesOfDebts" (
    "id" TEXT NOT NULL,
    "image" TEXT[],
    "debtId" TEXT NOT NULL,

    CONSTRAINT "ImagesOfDebts_pkey" PRIMARY KEY ("id")
);

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

-- CreateIndex
CREATE UNIQUE INDEX "Sellers_login_key" ON "public"."Sellers"("login");

-- CreateIndex
CREATE UNIQUE INDEX "Sellers_phone_key" ON "public"."Sellers"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Sellers_email_key" ON "public"."Sellers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_username_key" ON "public"."Admin"("username");

-- AddForeignKey
ALTER TABLE "public"."Debters" ADD CONSTRAINT "Debters_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "public"."Sellers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Debt" ADD CONSTRAINT "Debt_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "public"."Sellers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Debt" ADD CONSTRAINT "Debt_debterId_fkey" FOREIGN KEY ("debterId") REFERENCES "public"."Debters"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Chat" ADD CONSTRAINT "Chat_debterId_fkey" FOREIGN KEY ("debterId") REFERENCES "public"."Debters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Chat" ADD CONSTRAINT "Chat_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "public"."Messages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Chat" ADD CONSTRAINT "Chat_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "public"."Sellers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Payments" ADD CONSTRAINT "Payments_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "public"."Sellers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Payments" ADD CONSTRAINT "Payments_debtId_fkey" FOREIGN KEY ("debtId") REFERENCES "public"."Debt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ExampleMessages" ADD CONSTRAINT "ExampleMessages_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "public"."Sellers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ImagesOfDebters" ADD CONSTRAINT "ImagesOfDebters_debterId_fkey" FOREIGN KEY ("debterId") REFERENCES "public"."Debters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ImagesOfDebts" ADD CONSTRAINT "ImagesOfDebts_debtId_fkey" FOREIGN KEY ("debtId") REFERENCES "public"."Debt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
