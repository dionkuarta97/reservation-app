import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

const main = async () => {

  await prismaClient.restaurant.createMany({
    data: [
      { id: 1, hours_open: 11, hours_close: 22, createdAt: new Date(), updatedAt: new Date() }
    ]
  });

  await prismaClient.table.createMany({
    data: [
      { id: 1, table_number: 1, createdAt: new Date(), updatedAt: new Date() },
      { id: 2, table_number: 2, createdAt: new Date(), updatedAt: new Date() },
      { id: 3, table_number: 3, createdAt: new Date(), updatedAt: new Date() },
      { id: 4, table_number: 4, createdAt: new Date(), updatedAt: new Date() },
      { id: 5, table_number: 5, createdAt: new Date(), updatedAt: new Date() }
    ]
  });

};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prismaClient.$disconnect();
  });