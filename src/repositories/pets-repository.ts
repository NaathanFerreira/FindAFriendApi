import { Pet, Prisma } from "@prisma/client";

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
  searchMany(query: string): Promise<Pet[]>;
  findById(petId: string): Promise<Pet | null>;
}
