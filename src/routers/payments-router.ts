import { Router } from 'express';
import { createPayment, getPaymentByTicket } from '@/controllers/payment-controller';
import { authenticateToken, validateBody, validateQuery } from '@/middlewares';
import { ticketIdSchema } from '@/schemas/tickets-schemas';
import { paymentBodySchema } from '@/schemas/payments-schema';

const paymentsRouter = Router();

paymentsRouter
  .all('*', authenticateToken)
  .get('/', validateQuery(ticketIdSchema), getPaymentByTicket)
  .post('/process', validateBody(paymentBodySchema), createPayment);

export { paymentsRouter };
