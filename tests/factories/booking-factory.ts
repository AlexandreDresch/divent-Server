import { prisma } from '@/config';

type createBooking = {
  roomId: number;
  userId: number;
};

export function createBooking({ roomId, userId }: createBooking) {
  return prisma.booking.create({
    data: {
      userId,
      roomId,
    },
  });
}
