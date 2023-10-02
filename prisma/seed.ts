import { prisma } from "@/server/prisma";

import { POSITIONS, TECHNOLOGIES } from "../src/constants/common";

async function main() {
  try {
    await prisma.positions.deleteMany();
    await prisma.positions.createMany({
      data: POSITIONS,
    });

    await prisma.skills.deleteMany();
    await prisma.skills.createMany({
      data: TECHNOLOGIES,
    });
  } catch (error) {
    return error;
  } finally {
    await prisma.$disconnect();
  }
}

main();
