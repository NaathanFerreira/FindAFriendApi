import { beforeEach, describe, expect, it } from "vitest";
import { AuthenticateUseCase } from ".";
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { hash } from "bcryptjs";

let orgsRepository: InMemoryOrgsRepository;
let sut: AuthenticateUseCase;

describe("Authenticate Use Case", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    sut = new AuthenticateUseCase(orgsRepository);
  });

  it("should be able to Authenticate", async () => {
    await orgsRepository.create({
      name: "Org 1",
      email: "org1@hotmail.com",
      password_hash: await hash("123456", 6),
      cep: "15041735",
      telephone: "17111111",
    });

    const { org } = await sut.execute({
      email: "org1@hotmail.com",
      password: "123456",
    });

    expect(org.id).toEqual(expect.any(String));
  });
});
