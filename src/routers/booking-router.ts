import { Router } from 'express';
import { authenticateToken, validateBody, validateParams } from '@/middlewares';

import { getBooking, postBooking } from '@/controllers/booking-controller';
import { bookingBodySchema } from '@/schemas/booking-schemas';

const bookingRouter = Router();

bookingRouter.all('*', authenticateToken).get('/', getBooking).post('/', validateBody(bookingBodySchema), postBooking);

export { bookingRouter };
