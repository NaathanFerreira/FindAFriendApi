import fastify from "fastify";
import { petsRoutes } from "./http/controllers/pets/routes";
import { orgsRoutes } from "./http/controllers/orgs/routes";
import fastifyJwt from "@fastify/jwt";
import { env } from "./env";
import fastifyCookie from "@fastify/cookie";

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: "refreshToken",
    signed: false,
  },
  sign: {
    expiresIn: "10m",
  },
});

app.register(fastifyCookie);

app.register(petsRoutes);
app.register(orgsRoutes);
