import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getTypes } from '@/controllers';

const ticketsRouter = Router();

ticketsRouter.all('*', authenticateToken).get('tickets/types', getTypes);

export { ticketsRouter };
