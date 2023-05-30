import { makeCreatePetUseCase } from "@/use-cases/factories/make-create-pet-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function create(req: FastifyRequest, reply: FastifyReply) {
  const createPetBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    city: z.string(),
    orgId: z.string(),
  });

  const { name, description, city, orgId } = createPetBodySchema.parse(
    req.body
  );

  const createPetUseCase = makeCreatePetUseCase();

  await createPetUseCase.execute({
    name,
    description,
    city,
    orgId,
  });

  return reply.status(201).send();
}
