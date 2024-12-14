import { Prisma, Role, Pet, Org } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { PetsRepository } from "./prisma-pets-repository";

export class InMemoryPetsRepository implements PetsRepository {

  public pets: Pet[] = []

  async findById(id: string): Promise<Pet | null> {
    const pet = this.pets.find(pet => pet.id === id)
    return pet || null
  }

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet: Pet = {
      id: randomUUID(),
      name: data.name,
      cep: data.cep,
      age: data.age,
      description: data.description,
      energy: data.energy,
      environment: data.environment,
      org_id: data.org_id,
      size: data.size,
      bairro: data.bairro,
      estado: data.estado,
      localidade: data.localidade,
      logradouro: data.logradouro,
      uf: data.uf
    }

    this.pets.push(pet)
    
    return pet
  }

}