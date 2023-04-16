import { notFoundError, unauthorizedError } from '@/errors';
import paymentRepository from '@/repositories/payment-repository';
import ticketRepository from '@/repositories/ticket-repository';

async function getPaymentByTicket(ticketId: number, userId: number) {
  const ticketValidation = await ticketRepository.getTicketById(ticketId);
  if (!ticketValidation) throw notFoundError();

  const userTicket = await paymentRepository.findTicketOwner(ticketId, userId);
  if (!userTicket) throw unauthorizedError();

  const payment = await paymentRepository.getPaymentByTicket(ticketId);
  return payment;
}

const paymentService = {
  getPaymentByTicket,
};

export default paymentService;
