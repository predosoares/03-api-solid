import { makeSearchGymsUseCase } from '@/use-cases/factories/make-search-gyms-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchGymsQueryParams = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { query, page } = searchGymsQueryParams.parse(request.query)

  const useCase = makeSearchGymsUseCase()

  const { gyms } = await useCase.execute({
    query,
    page,
  })

  reply.status(200).send({ gyms })
}
