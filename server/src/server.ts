import express from 'express'
import cors from "cors"
import { PrismaClient } from "@prisma/client"
const app = express()
const prisma = new PrismaClient()
const port = process.env.SERVER_PORT

app.use(cors())

const test = async () => {
  console.log("creating user: ")
  let user = await prisma.user.upsert({
    where: {
      id: 1
    },
    update: {
      name: "test user1"
    },
    create: {
      id: 1,
      email: "testuser@email.com",
      name: "test user",
    },
  })
  console.log(user)

  console.log("findmany users")
  let logThis = await prisma.user.findMany()
  console.log(logThis)
}

app.get('/', async (req, res) => {
  try {
    console.log("starting test...")
    await test()
    console.log("test completed...")
    res.status(200).send("test completed...")
  } catch (error) {
    console.log("error")
    console.log(error)
    res.status(500).send("error")
  }
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
