/*
  Warnings:

  - Added the required column `adress_id` to the `Orgs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `adress_id` to the `Pets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Orgs" ADD COLUMN     "adress_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Pets" ADD COLUMN     "adress_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "logradouro" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "localidade" TEXT NOT NULL,
    "uf" TEXT NOT NULL,
    "estado" TEXT NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Orgs" ADD CONSTRAINT "Orgs_adress_id_fkey" FOREIGN KEY ("adress_id") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pets" ADD CONSTRAINT "Pets_adress_id_fkey" FOREIGN KEY ("adress_id") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
