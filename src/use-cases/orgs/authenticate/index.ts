import { compare, hash } from "bcryptjs";
import { OrgsRepository } from "@/repositories/orgs-repository";
import { Org } from "@prisma/client";

interface AuthenticateRequest {
  email: string;
  password: string;
}

interface AuthenticateResponse {
  org: Org;
}

export class AuthenticateUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateRequest): Promise<AuthenticateResponse> {
    const org = await this.orgsRepository.findByEmail(email);

    if (!org) {
      throw new Error("Invalid credentials");
    }

    const doesPasswordMatches = await compare(password, org.password_hash);

    if (!doesPasswordMatches) {
      throw new Error("Invalid credentials");
    }

    return { org };
  }
}
