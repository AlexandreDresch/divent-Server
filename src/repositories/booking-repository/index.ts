import { Booking } from '@prisma/client';
import { prisma } from '@/config';

type createBooking = Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>;

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

async function createBooking({ roomId, userId }: createBooking) {
  return prisma.booking.create({
    data: {
      roomId,
      userId,
    },
  });
}

const bookingRepository = {
  getBooking,
  createBooking,
};

export default bookingRepository;
