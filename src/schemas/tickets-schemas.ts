import joi from 'joi';

export const createUserTicketSchema = joi.object({
  ticketTypeId: joi.number().required(),
});

export const ticketIdSchema = joi.object({
  ticketId: joi.number().required(),
});
