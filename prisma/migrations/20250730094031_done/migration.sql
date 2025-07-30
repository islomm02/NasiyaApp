-- CreateEnum
CREATE TYPE "public"."UsersRole" AS ENUM ('ADMIN', 'SUPER_ADMIN', 'SELLER', 'DEBTER');

-- CreateEnum
CREATE TYPE "public"."MessageStatus" AS ENUM ('SEND', 'NOT_SEND', 'SENDING');

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

    CONSTRAINT "Sellers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Debters" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "debtId" TEXT NOT NULL,
    "sellerId" TEXT NOT NULL,

    CONSTRAINT "Debters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Debt" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "term" TEXT NOT NULL,
    "description" TEXT,

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
    "message" TEXT NOT NULL,
    "status" "public"."MessageStatus" NOT NULL DEFAULT 'SENDING',

    CONSTRAINT "Chat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Payments" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "debtId" TEXT NOT NULL,

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
    "image" TEXT NOT NULL,
    "debtId" TEXT NOT NULL,

    CONSTRAINT "ImagesOfDebts_pkey" PRIMARY KEY ("id")
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
ALTER TABLE "public"."Debters" ADD CONSTRAINT "Debters_debtId_fkey" FOREIGN KEY ("debtId") REFERENCES "public"."Debt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Debters" ADD CONSTRAINT "Debters_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "public"."Sellers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Chat" ADD CONSTRAINT "Chat_debterId_fkey" FOREIGN KEY ("debterId") REFERENCES "public"."Debters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Payments" ADD CONSTRAINT "Payments_debtId_fkey" FOREIGN KEY ("debtId") REFERENCES "public"."Debt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ExampleMessages" ADD CONSTRAINT "ExampleMessages_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "public"."Sellers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ImagesOfDebters" ADD CONSTRAINT "ImagesOfDebters_debterId_fkey" FOREIGN KEY ("debterId") REFERENCES "public"."Debters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ImagesOfDebts" ADD CONSTRAINT "ImagesOfDebts_debtId_fkey" FOREIGN KEY ("debtId") REFERENCES "public"."Debt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
