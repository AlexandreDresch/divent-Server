import { notFoundError, paymentRequired } from '@/errors';
import enrollmentRepository from '@/repositories/enrollment-repository';
import hotelRepository from '@/repositories/hotel-repository';
import ticketRepository from '@/repositories/ticket-repository';

async function getHotels(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);

  if (!enrollment) throw notFoundError();

  const ticket = await ticketRepository.getTicketByEnrollmentId(enrollment.id);

  if (!ticket) throw notFoundError();

  if (ticket.status === 'RESERVED' || ticket.TicketType.includesHotel === false || ticket.TicketType.isRemote === true)
    throw paymentRequired();

  const hotels = await hotelRepository.getHotels();

  return hotels;
}

const hotelsService = {
  getHotels,
};

export default hotelsService;
