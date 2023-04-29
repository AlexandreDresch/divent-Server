import { Booking } from '@prisma/client';
import { prisma } from '@/config';

type CreateBooking = Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>;
type UpdateBooking = Omit<CreateBooking, 'createdAt' | 'updatedAt'>;

async function getBooking(userId: number) {
  return prisma.booking.findFirst({
    where: {
      userId,
    },
    include: {
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

const bookingRepository = {
  getBooking,
  createBooking,
  getRoomBooking,
};

export default bookingRepository;
