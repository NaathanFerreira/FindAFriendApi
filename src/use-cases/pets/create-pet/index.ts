import { PetsRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";

interface CreatePetRequest {
  name: string;
  description: string;
  city: string;
  orgId: string;
}

interface CreatePetResponse {
  pet: Pet;
}

export class CreatePetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    name,
    description,
    city,
    orgId,
  }: CreatePetRequest): Promise<CreatePetResponse> {
    const pet = await this.petsRepository.create({
      name,
      description,
      city,
      org_id: orgId,
    });

    return { pet };
  }
}
