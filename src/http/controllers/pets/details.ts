import { makeGetPetDetailsUseCase } from "@/use-cases/factories/make-get-pet-details-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function details(req: FastifyRequest, reply: FastifyReply) {
  const petDetailsParamsSchema = z.object({
    id: z.string(),
  });

  const { id } = petDetailsParamsSchema.parse(req.params);

  const getPetDetailsUseCase = makeGetPetDetailsUseCase();

  const { pet } = await getPetDetailsUseCase.execute({
    petId: id,
  });

  return reply.status(200).send({
    pet,
  });
}
