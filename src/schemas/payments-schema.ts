import joi from 'joi';

export const paymentBodySchema = joi.object({
  ticketId: joi.number().required(),
  cardData: joi.object().required(),
});
