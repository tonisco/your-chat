/*
  Warnings:

  - Added the required column `conversationMembersNumber` to the `Conversation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MessageType" AS ENUM ('user', 'bot');

-- DropForeignKey
ALTER TABLE "Conversation" DROP CONSTRAINT "Conversation_latestMessageId_fkey";

-- AlterTable
ALTER TABLE "Conversation" ADD COLUMN     "conversationMembersNumber" INTEGER NOT NULL,
ALTER COLUMN "latestMessageId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "type" "MessageType" NOT NULL;

-- AddForeignKey
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_latestMessageId_fkey" FOREIGN KEY ("latestMessageId") REFERENCES "Message"("id") ON DELETE SET NULL ON UPDATE CASCADE;
