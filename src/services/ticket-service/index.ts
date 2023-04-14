import { TicketType } from '@prisma/client';
import { notFoundError } from '@/errors';
import ticketRepository from '@/repositories/ticket-repository';

async function getTypes(): Promise<TicketType[]> {
  const types: TicketType[] = await ticketRepository.getTypes();

  if (!types) throw notFoundError();

  return types;
}

const ticketsService = {
  getTypes,
};

export default ticketsService;
