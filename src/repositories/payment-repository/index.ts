import { prisma } from '@/config';

async function getPaymentByTicket(ticketId: number) {
  return prisma.payment.findFirst({
    where: { ticketId },
  });
}

async function findTicketOwner(ticketId: number, userId: number) {
  return prisma.enrollment.findFirst({
    where: {
      userId: userId,
    },
    select: {
      Ticket: {
        where: {
          id: ticketId,
        },
      },
    },
  });
}

const paymentRepository = {
  getPaymentByTicket,
  findTicketOwner,
};

export default paymentRepository;
