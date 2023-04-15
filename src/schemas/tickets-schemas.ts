import joi from 'joi';

export const createUserTicketSchema = joi.object({
  ticketTypeId: joi.number().required(),
});
