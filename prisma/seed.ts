// // import { PrismaClient } from "@prisma/client";
// // const prisma = new PrismaClient();
// import { POSITIONS, TECHNOLOGIES } from "../src/constants/common";
// import prisma from "../src/server/prisma";

// async function main() {
//   try {
//     await prisma.positions.deleteMany();
//     await prisma.positions.createMany({
//       data: POSITIONS,
//     });
//     await prisma.skills.deleteMany();
//     await prisma.skills.createMany({
//       data: TECHNOLOGIES,
//     });
//   } catch (error) {
//     return error;
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// main();
