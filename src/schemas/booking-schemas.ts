import joi from 'joi';

export const bookingBodySchema = joi.object({
  roomId: joi.number().required(),
});
