import { Router } from 'express';
import { authenticateToken, validateBody, validateParams } from '@/middlewares';

import { getBooking, postBooking, updateBooking } from '@/controllers/booking-controller';
import { bookingBodySchema, bookingParamsSchema } from '@/schemas/booking-schemas';

const bookingRouter = Router();

bookingRouter
  .all('*', authenticateToken)
  .get('/', getBooking)
  .post('/', validateBody(bookingBodySchema), postBooking)
  .put('/:bookingId', validateBody(bookingBodySchema), validateParams(bookingParamsSchema), updateBooking);

export { bookingRouter };
