import { PetsRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";

interface GetPetDetailsRequest {
  petId: string;
}

interface GetPetDetailsResponse {
  pet: Pet;
}

export class GetPetDetailsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    petId,
  }: GetPetDetailsRequest): Promise<GetPetDetailsResponse> {
    const pet = await this.petsRepository.findById(petId);

    if (!pet) {
      throw new Error("Pet not found");
    }

    return { pet };
  }
}
