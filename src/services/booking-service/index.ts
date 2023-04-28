import { notFoundError, unauthorizedError } from '@/errors';
import bookingRepository from '@/repositories/booking-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketRepository from '@/repositories/ticket-repository';

async function getBooking(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);

  if (!enrollment) throw notFoundError();

  const ticket = await ticketRepository.getTicketByEnrollmentId(enrollment.id);

  if (!ticket) throw notFoundError();

  if (ticket.status === 'RESERVED' || !ticket.TicketType.includesHotel || ticket.TicketType.isRemote)
    throw unauthorizedError();

  const booking = await bookingRepository.getBooking(userId);

  if (!booking) throw notFoundError();

  const bookingData = {
    id: booking.id,
    Room: booking.Room,
  };

  return bookingData;
}

const bookingService = {
  getBooking,
};

export default bookingService;
