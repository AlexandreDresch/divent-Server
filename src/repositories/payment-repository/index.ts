import { Payment } from '@prisma/client';
import { prisma } from '@/config';

async function getPaymentByTicket(ticketId: number) {
  return prisma.payment.findFirst({
    where: { ticketId },
  });
}

async function createPayment(data: PaymentParams) {
  return prisma.payment.create({
    data,
  });
}

export type PaymentParams = Omit<Payment, 'id' | 'createdAt' | 'updatedAt'>;

const paymentRepository = {
  getPaymentByTicket,
  createPayment,
};

export default paymentRepository;
