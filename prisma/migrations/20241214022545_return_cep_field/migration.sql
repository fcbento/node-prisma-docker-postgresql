/*
  Warnings:

  - Added the required column `cep` to the `Pets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Orgs" ALTER COLUMN "cep" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Pets" ADD COLUMN     "cep" TEXT NOT NULL;
