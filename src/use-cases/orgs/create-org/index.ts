import { hash } from "bcryptjs";
import { OrgsRepository } from "@/repositories/orgs-repository";
import { Org } from "@prisma/client";

interface CreateOrgRequest {
  name: string;
  email: string;
  password: string;
  cep: string;
  telephone: string;
}

interface CreateOrgResponse {
  org: Org;
}

export class CreateOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    name,
    email,
    password,
    cep,
    telephone,
  }: CreateOrgRequest): Promise<CreateOrgResponse> {
    const password_hash = await hash(password, 6);

    const org = await this.orgsRepository.create({
      name,
      email,
      password_hash,
      cep,
      telephone,
    });

    return { org };
  }
}
