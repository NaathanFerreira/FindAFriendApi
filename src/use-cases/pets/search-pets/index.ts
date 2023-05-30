import { PetsRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";

interface SearchPetsRequest {
  query: string;
}

interface SearchPetsResponse {
  pets: Pet[];
}

export class SearchPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({ query }: SearchPetsRequest): Promise<SearchPetsResponse> {
    const pets = await this.petsRepository.searchMany(query);

    return { pets };
  }
}
