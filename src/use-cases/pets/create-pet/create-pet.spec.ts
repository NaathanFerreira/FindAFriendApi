import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreatePetUseCase } from ".";

let petsRepository: InMemoryPetsRepository;
let sut: CreatePetUseCase;

describe("Create Pet Use Case", () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository();
    sut = new CreatePetUseCase(petsRepository);
  });

  it("should be able to create a pet", async () => {
    const { pet } = await sut.execute({
      name: "Pet 1",
      description: "pet description",
      city: "Rio Preto",
      orgId: "orgtest",
    });

    expect(pet.id).toEqual(expect.any(String));
    expect(pet.name).toBe("Pet 1");
  });
});
