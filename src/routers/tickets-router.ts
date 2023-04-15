import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { createUserTicket, getTypes, getUserTickets } from '@/controllers';
import { createUserTicketSchema } from '@/schemas/tickets-schemas';

const ticketsRouter = Router();

ticketsRouter
  .all('*', authenticateToken)
  .get('/types', getTypes)
  .get('/', getUserTickets)
  .post('/', validateBody(createUserTicketSchema), createUserTicket);

export { ticketsRouter };
