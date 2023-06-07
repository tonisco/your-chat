/*
  Warnings:

  - Added the required column `conversationMembersNumber` to the `Conversation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MessageType" AS ENUM ('user', 'bot');

-- AlterTable
ALTER TABLE "Conversation" ADD COLUMN     "conversationMembersNumber" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "type" "MessageType" NOT NULL;
