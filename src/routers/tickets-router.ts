import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getTypes, getUserTickets } from '@/controllers';

const ticketsRouter = Router();

ticketsRouter.all('*', authenticateToken).get('/types', getTypes).get('/', getUserTickets);

export { ticketsRouter };
