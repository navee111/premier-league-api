import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  const team = await prisma.team.create( {
    data: {
      name: "Arsenal",

    }
  })
  console.log(team)
}
main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())