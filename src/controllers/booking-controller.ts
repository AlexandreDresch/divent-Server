import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';

import { AuthenticatedRequest } from '@/middlewares';
import bookingService from '@/services/booking-service';

export async function getBooking(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req as { userId: number };

  try {
    const booking = await bookingService.getBooking(userId);

    res.status(httpStatus.OK).send(booking);
  } catch (error) {
    next(error);
  }
}

export async function postBooking(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req as { userId: number };
  const { roomId } = req.body;

  try {
    const booking = await bookingService.postBooking(userId, +roomId);

    res.status(httpStatus.OK).send(booking);
  } catch (error) {
    next(error);
  }
}

export async function updateBooking(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req as { userId: number };
  const { roomId } = req.body;
  const { bookingId } = req.params;

  // if (!roomId) return res.sendStatus(httpStatus.BAD_REQUEST);

  try {
    const booking = await bookingService.updateBooking(userId, +bookingId, +roomId);

    return res.status(200).send(booking);
  } catch (error) {
    next(error);
  }
}
