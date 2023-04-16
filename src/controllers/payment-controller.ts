import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import paymentService from '@/services/payments-service';
import { AuthenticatedRequest } from '@/middlewares';

export async function getPaymentByTicket(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { ticketId } = req.query as { ticketId: string };
  const { userId } = req as { userId: number };

  try {
    const payment = await paymentService.getPaymentByTicket(+ticketId, userId);

    res.status(httpStatus.OK).send(payment);
  } catch (error) {
    next(error);
  }
}

export async function createPayment(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req as { userId: number };
  const { ticketId, cardData } = req.body;

  if (!ticketId || !cardData) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }

  try {
    const payment = await paymentService.createPayment(ticketId, userId, cardData);

    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    if (error.name === 'UnauthorizedError') {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
