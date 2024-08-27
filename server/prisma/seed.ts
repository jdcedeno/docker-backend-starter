import { PrismaClient } from "@prisma/client"

console.log("running seed script...")
const prisma = new PrismaClient()

const isDatabaseEmpty = async () => {
    const tablesToCheck = [
        prisma.user.count(),
        prisma.profile.count(),
        prisma.post.count()
    ]

    const results = await Promise.all(tablesToCheck)
    console.log("isDatabaseEmpty tables records count: ")
    console.log(results)

    return results.every(count => count === 0)
}

async function main() {
    if (!(await isDatabaseEmpty())) {
        console.log("database is not empty...")
        return
    }

    await prisma.user.upsert({
        where: { email: "testUser01@test.com" },
        update: {},
        create: {
            email: "testUser01@test.com",
            name: "testUser01",
            posts: {
                create: {
                    title: "Lorem Ipsum 01",
                    content: "Velit excepteur exercitation exercitation proident elit.",
                    published: true,
                },
            },
        },
    })

    await prisma.user.upsert({
        where: { email: "testUser02@test.com" },
        update: {},
        create: {
            email: "testUser02@test.com",
            name: "testUser02",
            posts: {
                create: [
                    {
                        title: "Lorem Ipsum 02",
                        content: "Non anim pariatur consequat excepteur id ea eiusmod labore est aute ex ex qui enim.",
                        published: true,
                    },
                    {
                        title: "Lorem Ipsum 03",
                        content: "Adipisicing aliqua aliqua ex cupidatat incididunt laboris magna elit reprehenderit reprehenderit reprehenderit nulla labore.",
                        published: true,
                    },
                ],
            },
        },
    })
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