import { prisma } from '@/config';

async function getPaymentByTicket(ticketId: number) {
  return prisma.payment.findFirst({
    where: { ticketId },
  });
}

async function findTicketOwner(ticketId: number) {
  return prisma.payment.findFirst({
    where: {
      ticketId,
    },
    select: { Ticket: { select: { Enrollment: true } } },
  });
}

const paymentRepository = {
  getPaymentByTicket,
  findTicketOwner,
};

export default paymentRepository;
