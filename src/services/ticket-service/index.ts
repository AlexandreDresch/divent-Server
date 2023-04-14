import { TicketType } from '@prisma/client';
import { notFoundError } from '@/errors';
import ticketRepository from '@/repositories/ticket-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';

async function getTypes(): Promise<TicketType[]> {
  const types: TicketType[] = await ticketRepository.getTypes();

  if (!types) throw notFoundError();

  return types;
}

async function getUserTickets(userId: number) {
  const enrollmentValidation = await enrollmentRepository.findEnrollmentByUserId(userId);

  if (!enrollmentValidation) throw notFoundError();

  const tickets = await ticketRepository.getUserTickets(enrollmentValidation.id);

  if (!tickets) throw notFoundError();

  return tickets;
}

const ticketsService = {
  getTypes,
  getUserTickets,
};

export default ticketsService;
