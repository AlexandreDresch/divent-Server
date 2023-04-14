import httpStatus from 'http-status';
import { NextFunction, Response } from 'express';
import { AuthenticatedRequest } from '@/middlewares';
import ticketsService from '@/services/ticket-service';

export async function getTypes(_req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const types = await ticketsService.getTypes();

    res.status(httpStatus.OK).send(types);
  } catch (error) {
    next(error);
  }
}

export async function getUserTickets(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req as { userId: number };

  try {
    const tickets = await ticketsService.getUserTickets(userId);

    return res.status(httpStatus.OK).send(tickets);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.status(httpStatus.NOT_FOUND).send(error.message);
    }

    next(error);
  }
}
