import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { GetPetDetailsUseCase } from ".";

let petsRepository: InMemoryPetsRepository;
let sut: GetPetDetailsUseCase;

describe("Get Pet Details Use Case", () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository();
    sut = new GetPetDetailsUseCase(petsRepository);
  });

  it("should be able to get a pet details", async () => {
    const createdPet = await petsRepository.create({
      name: "Pet 1",
      description: "pet description",
      city: "Rio Preto",
      org_id: "orgtest",
    });

    const { pet } = await sut.execute({ petId: createdPet.id });

    expect(pet.id).toEqual(expect.any(String));
  });
});
