import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';

import { AuthenticatedRequest } from '@/middlewares';
import hotelsService from '@/services/hotels-service';

export async function getHotels(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req as { userId: number };

  try {
    const hotels = await hotelsService.getHotels(userId);

    res.status(httpStatus.OK).send(hotels);
  } catch (error) {
    next(error);
  }
}

export async function getRoomsByHotelId(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req as { userId: number };
  const { hotelId } = req.params;

  try {
    const rooms = await hotelsService.getRoomsByHotelId(+hotelId, userId);

    res.status(httpStatus.OK).send(rooms);
  } catch (error) {
    next(error);
  }
}
