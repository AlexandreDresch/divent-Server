import joi from 'joi';

export const bookingBodySchema = joi.object({
  roomId: joi.number().required(),
});

export const bookingParamsSchema = joi.object({
  bookingId: joi.number().required(),
});
