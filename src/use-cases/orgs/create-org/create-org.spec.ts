import { beforeEach, describe, expect, it } from "vitest";
import { CreateOrgUseCase } from ".";
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";

let orgsRepository: InMemoryOrgsRepository;
let sut: CreateOrgUseCase;

describe("Create Org Use Case", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    sut = new CreateOrgUseCase(orgsRepository);
  });

  it("should be able to create an org", async () => {
    const { org } = await sut.execute({
      name: "Org 1",
      email: "org1@hotmail.com",
      password: "123456",
      cep: "15041735",
      telephone: "17111111",
    });

    expect(org.id).toEqual(expect.any(String));
    expect(org.name).toBe("Org 1");
  });
});
