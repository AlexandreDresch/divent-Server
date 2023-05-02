import { prisma } from '@/config';

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

async function createBooking(userId: number, roomId: number) {
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
