import { Booking } from '@prisma/client';
import { prisma } from '@/config';

type CreateBooking = Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>;
type UpdateBooking = {
  bookingId: number;
  roomId: number;
  userId: number;
};

async function getBooking(userId: number) {
  return prisma.booking.findFirst({
    where: {
      userId,
    },
    select: {
      id: true,
      Room: true,
    },
  });
}

async function createBooking({ roomId, userId }: CreateBooking) {
  return prisma.booking.create({
    data: {
      userId,
      roomId,
    },
  });
}

async function getRoomBooking(roomId: number) {
  return prisma.booking.findMany({
    where: {
      roomId,
    },
  });
}

async function updateBooking({ bookingId, roomId, userId }: UpdateBooking) {
  return await prisma.booking.update({
    where: {
      id: bookingId,
    },
    data: {
      roomId,
      userId,
    },
  });
}

const bookingRepository = {
  getBooking,
  createBooking,
  getRoomBooking,
  updateBooking,
};

export default bookingRepository;
