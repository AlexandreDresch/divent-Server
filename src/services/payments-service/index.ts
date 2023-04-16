import { notFoundError, unauthorizedError } from '@/errors';
import { CardDataParams } from '@/protocols';
import enrollmentRepository from '@/repositories/enrollment-repository';
import paymentRepository from '@/repositories/payment-repository';
import ticketRepository from '@/repositories/ticket-repository';

async function getPaymentByTicket(ticketId: number, userId: number) {
  const ticketValidation = await ticketRepository.getTicketById(ticketId);
  if (!ticketValidation) {
    throw notFoundError();
  }

  // const userTicket = await paymentRepository.findTicketOwner(ticketId);
  // if (!userTicket) throw unauthorizedError();

  const userTicket = await enrollmentRepository.findEnrollmentById(ticketValidation.enrollmentId);

  if (!userTicket || userTicket.userId !== userId) {
    throw unauthorizedError();
  }

  const payment = await paymentRepository.getPaymentByTicket(ticketId);

  const paymentFormatted = {
    id: payment.id,
    ticketId: payment.ticketId,
    value: payment.value,
    cardIssuer: payment.cardIssuer,
    cardLastDigits: payment.cardLastDigits,
    createdAt: payment.createdAt,
    updatedAt: payment.updatedAt,
  };

  return paymentFormatted;
}

async function createPayment(ticketId: number, userId: number, cardData: CardDataParams) {
  const ticketValidation = await ticketRepository.getTicketById(ticketId);
  if (!ticketValidation) {
    throw notFoundError();
  }

  // const userTicket = await paymentRepository.findTicketOwner(ticketId);
  // if (!userTicket) throw unauthorizedError();

  const userTicket = await enrollmentRepository.findEnrollmentById(ticketValidation.enrollmentId);

  if (!userTicket || userTicket.userId !== userId) {
    throw unauthorizedError();
  }

  const ticket = await ticketRepository.getUserTickets(ticketId);

  const paymentFormatted = {
    ticketId,
    value: ticket.TicketType.price,
    cardIssuer: cardData.issuer,
    cardLastDigits: cardData.number.toString().slice(-4),
  };

  const payment = await paymentRepository.createPayment(ticketId, paymentFormatted);

  await ticketRepository.updateTicket(ticketId);

  return payment;
}

const paymentService = {
  getPaymentByTicket,
  createPayment,
};

export default paymentService;
