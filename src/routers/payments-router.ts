import { Router } from 'express';
import { getPaymentByTicket } from '@/controllers/payment-controller';
import { authenticateToken, validateQuery } from '@/middlewares';
import { createUserTicketSchema } from '@/schemas/tickets-schemas';

const paymentsRouter = Router();

paymentsRouter.all('*', authenticateToken).get('/', validateQuery(createUserTicketSchema), getPaymentByTicket);

export { paymentsRouter };
