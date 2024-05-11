import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { FastifyInstance } from "fastify";

export async function getVote(app: FastifyInstance) {
  app.get("/polls/:pollId/vote", async (request, reply) => {
    const getPollParams = z.object({
      pollId: z.string().uuid(),
    });

    const { pollId } = getPollParams.parse(request.params);

    const { sessionId } = request.cookies;

    if (!sessionId) {
      return reply.status(100).send({ pollOptionId: undefined });
    }

    const vote = await prisma.vote.findUnique({
      where: {
        sessionId_pollId: {
          pollId,
          sessionId,
        },
      },
      select: {
        pollOptionId: true,
      },
    });

    if (!vote) {
      return reply.status(400).send({ message: "Vote not found." });
    }

    return reply.send({
      pollOptionId: vote.pollOptionId,
    });
  });
}
