import { prisma } from '@/config';

async function getPaymentByTicket(ticketId: number) {
  return prisma.payment.findFirst({
    where: { ticketId },
  });
}

async function findTicketOwner(ticketId: number, userId: number) {
  return prisma.ticket.findFirst({
    where: { id: ticketId, Enrollment: { userId } },
    include: { Enrollment: true },
  });
}

const paymentRepository = {
  getPaymentByTicket,
  findTicketOwner,
};

export default paymentRepository;
