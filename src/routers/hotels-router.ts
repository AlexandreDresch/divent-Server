import { Router } from 'express';
import { authenticateToken, validateParams } from '@/middlewares';
import { getHotels, getRoomsByHotelId } from '@/controllers/hotels-controller';
import { hotelIdSchema } from '@/schemas/hotel-schemas';

const hotelsRouter = Router();

hotelsRouter
  .all('*', authenticateToken)
  .get('/', getHotels)
  .get('/:hotelId', validateParams(hotelIdSchema), getRoomsByHotelId);

export { hotelsRouter };
