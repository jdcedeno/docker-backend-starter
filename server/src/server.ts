import express from 'express'
import cors from "cors"
import mysql from 'mysql2'

const app = express()
const port = 3000

app.use(cors())

// Create a connection pool
const pool = mysql.createPool({
  host: 'mariadb',
  user: process.env.MARIADB_USER,
  password: process.env.MARIADB_PASSWORD,
  database: process.env.MARIADB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

app.get('/', (req, res) => {
  // Get a connection from the pool and execute a query
  pool.query('SELECT 1 + 1 AS solution', (error, results) => {
    if (error) {
      console.error('Error during query:', error.stack)
      res.status(500).send('Error during query.')
      return
    }
    console.log(results)
    res.send(`The solution is: ${(results as any)[0] as any}`)
  })
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
