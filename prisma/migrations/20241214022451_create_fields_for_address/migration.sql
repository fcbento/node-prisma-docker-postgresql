/*
  Warnings:

  - You are about to drop the column `adress_id` on the `Orgs` table. All the data in the column will be lost.
  - You are about to drop the column `adress_id` on the `Pets` table. All the data in the column will be lost.
  - You are about to drop the column `cep` on the `Pets` table. All the data in the column will be lost.
  - You are about to drop the `Address` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `bairro` to the `Orgs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estado` to the `Orgs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `localidade` to the `Orgs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `logradouro` to the `Orgs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uf` to the `Orgs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bairro` to the `Pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estado` to the `Pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `localidade` to the `Pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `logradouro` to the `Pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uf` to the `Pets` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Orgs" DROP CONSTRAINT "Orgs_adress_id_fkey";

-- DropForeignKey
ALTER TABLE "Pets" DROP CONSTRAINT "Pets_adress_id_fkey";

-- AlterTable
ALTER TABLE "Orgs" DROP COLUMN "adress_id",
ADD COLUMN     "bairro" TEXT NOT NULL,
ADD COLUMN     "estado" TEXT NOT NULL,
ADD COLUMN     "localidade" TEXT NOT NULL,
ADD COLUMN     "logradouro" TEXT NOT NULL,
ADD COLUMN     "uf" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Pets" DROP COLUMN "adress_id",
DROP COLUMN "cep",
ADD COLUMN     "bairro" TEXT NOT NULL,
ADD COLUMN     "estado" TEXT NOT NULL,
ADD COLUMN     "localidade" TEXT NOT NULL,
ADD COLUMN     "logradouro" TEXT NOT NULL,
ADD COLUMN     "uf" TEXT NOT NULL;

-- DropTable
DROP TABLE "Address";
