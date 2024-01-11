import prisma from "../src/server/prisma";

function generateRandomId() {
  const randomPart = Math.random().toString(16).substring(2);
  return randomPart + new Date().getTime().toString(16);
}

// function generateRandomString(length: number) {
//   const characters =
//     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//   let result = "";
//   for (let i = 0; i < length; i++) {
//     result += characters.charAt(Math.floor(Math.random() * characters.length));
//   }
//   return result;
// }

async function main() {
  try {
    const skills = ["JavaScript", "React", "Node.js", "SQL", "HTML", "CSS"];
    const positions = [
      "Frontend Developer",
      "Backend Developer",
      "UI/UX Designer",
      "Product Manager",
    ];
    const projects = ["Project A", "Project B", "Project C", "Project D"];
    for (let i = 0; i < 50; i++) {
      // Creează utilizator
      const userId = generateRandomId();

      const user = await prisma.user.create({
        data: {
          id: userId,
          image: `https://robohash.org/${userId}`,
          name: `User ${i + Math.floor(Math.random() * 100) + 1}`,
          email: `user${i + Math.floor(Math.random() * 250) + 1}@example.com`,
        },
      });

      // Adaugă abilități utilizatorului
      for (const skillName of skills) {
        const skill = await prisma.skill.upsert({
          where: { name: skillName },
          update: {},
          create: { name: skillName },
        });

        await prisma.userSkill.create({
          data: {
            skillId: skill.id,
            userId: user.id,
            name: skill.name,
            rating: Math.floor(Math.random() * 5) + 1, // Rating între 1 și 5
          },
        });
      }

      // Adaugă poziții utilizatorului (random din șirul de poziții)
      const userPositions = positions.slice(
        0,
        Math.floor(Math.random() * positions.length) + 1
      );
      for (const positionName of userPositions) {
        const position = await prisma.position.upsert({
          where: { name: positionName },
          update: {},
          create: { name: positionName },
        });

        await prisma.userPosition.create({
          data: {
            name: `${positionName}`,
            userId: user.id,
            positionId: position.id,
          },
        });
      }

      // Adaugă proiecte utilizatorului (random din șirul de proiecte)
      const userProjects = projects.slice(
        0,
        Math.floor(Math.random() * projects.length) + 1
      );
      for (const projectName of userProjects) {
        const project = await prisma.project.upsert({
          where: { name: projectName },
          update: {},
          create: { name: projectName },
        });

        await prisma.userProject.create({
          data: {
            name: projectName || "project name",
            description: `Description for ${projectName}`,
            startDate: new Date(), // Modifică pentru a atribui o dată aleatoare
            userId: user.id,
            projectId: project.id,
          },
        });
      }
    }
  } catch (error) {
    return error;
  } finally {
    await prisma.$disconnect();
  }
}

main();
