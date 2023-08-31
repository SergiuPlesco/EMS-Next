import { PrismaClient } from "@prisma/client";

import { POSITIONS, TECHNOLOGIES } from "../src/constants/common";
const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.position.deleteMany();
    await prisma.position.createMany({
      data: POSITIONS,
    });

    await prisma.skill.deleteMany();
    await prisma.skill.createMany({
      data: TECHNOLOGIES,
    });
  } catch (error) {
    return error;
  } finally {
    await prisma.$disconnect();
  }
}

main();
