import { Router } from 'express';
import { authenticateToken, validateParams } from '@/middlewares';

import { getBooking } from '@/controllers/booking-controller';

const bookingRouter = Router();

bookingRouter.all('*', authenticateToken).get('/', getBooking).get('/:roomId');

export { bookingRouter };
