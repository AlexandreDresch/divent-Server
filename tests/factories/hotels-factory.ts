import faker from '@faker-js/faker';
import { prisma } from '@/config';

export async function createHotel() {
  return prisma.hotel.create({
    data: {
      name: faker.name.findName(),
      image: faker.image.imageUrl(),
    },
  });
}

export async function createHotelRoom(hotelId: number) {
  return prisma.room.create({
    data: {
      name: faker.datatype.number().toString(),
      capacity: 2,
      hotelId: hotelId,
    },
  });
}

export async function createFullRoom(hotelId: number) {
  return prisma.room.create({
    data: {
      name: faker.datatype.number().toString(),
      capacity: 0,
      hotelId: hotelId,
    },
  });
}
