import { Prisma, Pet } from "@prisma/client";
import { PetsRepository } from "../pets-repository";
import { prisma } from "@/lib/prisma";

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = await prisma.pet.create({
      data,
    });

    return pet;
  }

  async searchMany(query: string): Promise<Pet[]> {
    const pets = prisma.pet.findMany({
      where: {
        city: {
          contains: query,
        },
      },
    });
    return pets;
  }

  async findById(petId: string): Promise<Pet | null> {
    const pet = prisma.pet.findUnique({
      where: {
        id: petId,
      },
    });

    return pet;
  }
}
