import { TicketType } from '@prisma/client';
import { prisma } from '@/config';

async function getTypes(): Promise<TicketType[]> {
  return prisma.ticketType.findMany();
}

const ticketRepository = {
  getTypes,
};

export default ticketRepository;
