import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { SearchPetsUseCase } from ".";

let petsRepository: InMemoryPetsRepository;
let sut: SearchPetsUseCase;

describe("Search Pets Use Case", () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository();
    sut = new SearchPetsUseCase(petsRepository);
  });

  it("should be able to search a pet", async () => {
    await petsRepository.create({
      name: "Pet 1",
      description: "pet description",
      city: "Rio Preto",
      org_id: "orgtest",
    });

    await petsRepository.create({
      name: "Pet 2",
      description: "pet description",
      city: "São Paulo",
      org_id: "orgtest",
    });

    const { pets } = await sut.execute({ query: "Rio" });

    expect(pets).toHaveLength(1);
    expect(pets).toEqual([expect.objectContaining({ name: "Pet 1" })]);
  });
});
