import { forbiddenError, notFoundError, unauthorizedError } from '@/errors';
import bookingRepository from '@/repositories/booking-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import roomRepository from '@/repositories/room-repository';
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

async function postBooking(userId: number, roomId: number) {
  const room = await roomRepository.getRoomById(roomId);
  if (!room) throw notFoundError();

  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();

  const ticket = await ticketRepository.getTicketByEnrollmentId(enrollment.id);
  if (!ticket) throw notFoundError();
  if (ticket.status === 'RESERVED' || !ticket.TicketType.includesHotel || ticket.TicketType.isRemote)
    throw forbiddenError();

  const bookingsByRoom = await bookingRepository.getRoomBooking(roomId);
  if (room.capacity <= bookingsByRoom.length) throw forbiddenError();

  const createBooking = await bookingRepository.createBooking(userId, roomId);

  const bookingData = {
    bookingId: createBooking.id,
  };

  return bookingData;
}

async function updateBooking(userId: number, bookingId: number, roomId: number) {
  const room = await roomRepository.getRoomById(roomId);
  if (!room) throw notFoundError();

  const bookingValidation = await bookingRepository.getBooking(userId);
  if (!bookingValidation) throw forbiddenError();

  const bookingsByRoom = await bookingRepository.getRoomBooking(bookingValidation.Room.id);
  if (room.capacity <= bookingsByRoom.length) throw forbiddenError();

  await bookingRepository.updateBooking({ bookingId: bookingId, roomId: roomId, userId: userId });

  const bookingData = {
    bookingId: bookingId,
  };

  return bookingData;
}

const bookingService = {
  getBooking,
  postBooking,
  updateBooking,
};

export default bookingService;
