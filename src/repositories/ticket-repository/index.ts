import { TicketType } from '@prisma/client';
import { prisma } from '@/config';

async function getTypes(): Promise<TicketType[]> {
  return prisma.ticketType.findMany();
}

async function getUserTickets(enrollmentId: number) {
  return prisma.ticket.findFirst({
    where: { enrollmentId },
    include: {
      TicketType: true,
    },
  });
}

async function createUserTicket(enrollmentId: number, ticketTypeId: number) {
  return prisma.ticket.create({
    data: {
      enrollmentId,
      ticketTypeId,
      status: 'RESERVED',
    },
    include: {
      TicketType: true,
    },
  });
}

const ticketRepository = {
  getTypes,
  getUserTickets,
  createUserTicket,
};

export default ticketRepository;
