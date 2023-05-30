import { makeCreateOrgUseCase } from "@/use-cases/factories/make-create-org-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function create(req: FastifyRequest, reply: FastifyReply) {
  const createOrgBodySchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
    cep: z.string(),
    telephone: z.string(),
  });

  const { name, email, password, cep, telephone } = createOrgBodySchema.parse(
    req.body
  );

  const createOrgUseCase = makeCreateOrgUseCase();

  await createOrgUseCase.execute({
    name,
    email,
    password,
    cep,
    telephone,
  });

  return reply.status(201).send();
}
