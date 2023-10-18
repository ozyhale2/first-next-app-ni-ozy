import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
    const superAdminRole = await prisma.role.upsert({
        where: { id: 1 },
        update: {},
        create: {
            name: 'Super Admin'
        }
    })

    const adminRole = await prisma.role.upsert({
        where: { id: 2 },
        update: {},
        create: {
            name: 'Admin'
        }
    })

    const userRole = await prisma.role.upsert({
        where: { id: 3 },
        update: {},
        create: {
            name: 'User'
        }
    })

    const adminUser = await prisma.user.upsert({
        where: { id: 1 },
        update: {},
        create: {
            email: "admin@email.com",
            name: 'Administrator',
            roleId: 1,
        }
    })

    console.log({ superAdminRole, adminRole, userRole, adminUser });
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
