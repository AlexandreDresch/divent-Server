import { forbiddenError, notFoundError, unauthorizedError } from '@/errors';
import bookingRepository from '@/repositories/booking-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import roomRepository from '@/repositories/room-repository';
import ticketRepository from '@/repositories/ticket-repository';

async function getUserEnrollment(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }

  return enrollment;
}

async function getAndValidateUserTicket(enrollmentId: number) {
  const ticket = await ticketRepository.getTicketByEnrollmentId(enrollmentId);
  if (!ticket) throw notFoundError();

  if (ticket.status === 'RESERVED' || !ticket.TicketType.includesHotel || ticket.TicketType.isRemote)
    throw forbiddenError();
}

async function getRoomBookingsAndValidateCapacity(roomId: number, roomCapacity: number) {
  const bookingsByRoom = await bookingRepository.getRoomBooking(roomId);
  if (roomCapacity <= bookingsByRoom.length) {
    throw forbiddenError();
  }

  return bookingsByRoom;
}

async function getBooking(userId: number) {
  const enrollment = await getUserEnrollment(userId);

  await getAndValidateUserTicket(enrollment.id);

  const booking = await bookingRepository.getBooking(userId);

  if (!booking) throw notFoundError();

  return booking;
}

async function postBooking(userId: number, roomId: number) {
  const room = await roomRepository.getRoomById(roomId);
  if (!room) throw notFoundError();

  const enrollment = await getUserEnrollment(userId);

  await getAndValidateUserTicket(enrollment.id);

  await getRoomBookingsAndValidateCapacity(roomId, room.capacity);

  const createBooking = await bookingRepository.createBooking(userId, roomId);

  return {
    bookingId: createBooking.id,
  };
}

async function updateBooking(userId: number, bookingId: number, roomId: number) {
  const room = await roomRepository.getRoomById(roomId);
  if (!room) throw notFoundError();

  const bookingValidation = await bookingRepository.getBooking(userId);
  if (!bookingValidation) throw forbiddenError();

  await getRoomBookingsAndValidateCapacity(bookingValidation.Room.id, room.capacity);

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
