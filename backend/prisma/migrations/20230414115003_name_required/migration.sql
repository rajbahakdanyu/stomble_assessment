/*
  Warnings:

  - Made the column `name` on table `Contact` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Contact" ALTER COLUMN "name" SET NOT NULL;