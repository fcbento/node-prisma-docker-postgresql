-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'MEMBER');

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'MEMBER',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Orgs" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cep" BIGINT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'ADMIN',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Orgs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "age" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "energy" TEXT NOT NULL,
    "environment" TEXT NOT NULL,
    "cep" BIGINT NOT NULL,
    "org_id" TEXT NOT NULL,

    CONSTRAINT "Pets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PetRequirements" (
    "id" TEXT NOT NULL,
    "requirement" TEXT NOT NULL,
    "pet_id" TEXT NOT NULL,

    CONSTRAINT "PetRequirements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PetPhotos" (
    "id" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "pet_id" TEXT NOT NULL,

    CONSTRAINT "PetPhotos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Orgs_email_key" ON "Orgs"("email");

-- AddForeignKey
ALTER TABLE "Pets" ADD CONSTRAINT "Pets_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "Orgs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PetRequirements" ADD CONSTRAINT "PetRequirements_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "Pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PetPhotos" ADD CONSTRAINT "PetPhotos_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "Pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
