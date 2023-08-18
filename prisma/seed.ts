import { PrismaClient } from "@prisma/client";

import { POSITIONS } from "../src/constants/common";
const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.position.deleteMany();
    await prisma.position.createMany({
      data: POSITIONS,
    });
  } catch (error) {
    return error;
  } finally {
    await prisma.$disconnect();
  }
}

main();
