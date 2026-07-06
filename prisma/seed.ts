import { PrismaClient, Role, TaskStatus, TaskPriority } from "@prisma/client";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const PASSWORD = "Password123";
const SALT_ROUNDS = 10;

async function main() {
  console.log("🌱 Seeding database...");

  // ------------------------
  // CLEAN OLD DATA
  // ------------------------
  await prisma.task.deleteMany();
  await prisma.board.deleteMany();
  await prisma.user.deleteMany();

  // ------------------------
  // USERS (20)
  // ------------------------
  const hashedPassword = await bcrypt.hash(PASSWORD, SALT_ROUNDS);

  const users = [];

  // 1 ADMIN
  users.push({
    email: "admin@test.com",
    name: "Admin User",
    role: Role.ADMIN,
    password: hashedPassword,
  });

  // 3 MANAGERS
  for (let i = 1; i <= 3; i++) {
    users.push({
      email: `manager${i}@test.com`,
      name: faker.person.fullName(),
      role: Role.MANAGER,
      password: hashedPassword,
    });
  }

  // 16 USERS
  for (let i = 1; i <= 16; i++) {
    users.push({
      email: `user${i}@test.com`,
      name: faker.person.fullName(),
      role: Role.USER,
      password: hashedPassword,
    });
  }

  const createdUsers = await prisma.user.createMany({
    data: users,
  });

  const allUsers = await prisma.user.findMany();

  // ------------------------
  // BOARDS (8)
  // ------------------------
  const boardNames = [
    "Backend API",
    "Frontend Web",
    "Mobile App",
    "DevOps",
    "UI/UX",
    "Marketing",
    "CRM",
    "Analytics",
  ];

  const boards = boardNames.map((name) => ({
    name,
    ownerId:
      allUsers[
        Math.floor(Math.random() * 4) // admin + managers only
      ].id,
  }));

  await prisma.board.createMany({ data: boards });
  const allBoards = await prisma.board.findMany();

  // ------------------------
  // TASKS (100)
  // ------------------------
  const tasks = [];

  const statuses = [
    TaskStatus.TODO,
    TaskStatus.IN_PROGRESS,
    TaskStatus.REVIEW,
    TaskStatus.DONE,
  ];

  const priorities = [
    TaskPriority.LOW,
    TaskPriority.MEDIUM,
    TaskPriority.HIGH,
  ];

  for (let i = 0; i < 100; i++) {
    const board = faker.helpers.arrayElement(allBoards);

    tasks.push({
      title: faker.hacker.phrase(),
      description: faker.lorem.sentences(2),
      status: faker.helpers.arrayElement(statuses),
      priority: faker.helpers.arrayElement(priorities),
      boardId: board.id,
      assigneeId: faker.helpers.arrayElement(allUsers).id,
      dueDate: faker.date.soon({ days: 30 }),
    });
  }

  await prisma.task.createMany({ data: tasks });

  // ------------------------
  // SUMMARY
  // ------------------------
  console.log("\n=========================");
  console.log("🌱 Seed completed!");
  console.log("=========================");

  console.log("\nLOGIN ACCOUNTS:");
  console.log("Admin: admin@test.com / Password123");
  console.log("Managers: manager1-3@test.com / Password123");
  console.log("Users: user1-16@test.com / Password123");

  console.log("\n✔ Users: 20");
  console.log("✔ Boards: 8");
  console.log("✔ Tasks: 100");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });