import { Prisma, Pet } from "@prisma/client";
import { randomUUID } from "crypto";
import { PetsRepository } from "../pets-repository";

export class InMemoryPetsRepository implements PetsRepository {
  public pets: Pet[] = [];

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = {
      id: data.id ?? randomUUID(),
      name: data.name,
      description: data.description,
      city: data.city,
      org_id: data.org_id,
    };

    this.pets.push(pet);

    return pet;
  }

  async searchMany(query: string): Promise<Pet[]> {
    const pets = this.pets.filter((pet) => pet.city.includes(query));

    return pets;
  }

  async findById(petId: string): Promise<Pet | null> {
    const pet = this.pets.find((pet) => pet.id === petId);

    if (!pet) {
      return null;
    }

    return pet;
  }
}
