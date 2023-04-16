import { Payment } from '@prisma/client';
import { prisma } from '@/config';

async function getPaymentByTicket(ticketId: number) {
  return prisma.payment.findFirst({
    where: { ticketId },
  });
}

async function createPayment(ticketId: number, payment: PaymentParams) {
  return prisma.payment.create({
    data: {
      ticketId,
      ...payment,
    },
  });
}

export type PaymentParams = Omit<Payment, 'id' | 'createdAt' | 'updatedAt'>;

const paymentRepository = {
  getPaymentByTicket,
  createPayment,
};

export default paymentRepository;
