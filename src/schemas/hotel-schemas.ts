import joi from 'joi';

export const hotelIdSchema = joi.object({
  hotelId: joi.number().min(1).required(),
});
