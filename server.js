// Imports
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './db/conn.js'
import roomRoutes from './routes/rooms.js'

// Setups
dotenv.config()
const app = express()
const PORT = process.env.PORT || 5001

connectDB()

// Middlewares
app.use(cors())
app.use(express.json())

// Routes
app.get('/', (req, res) => {
  res.send('API is running')
})

app.use('/api/rooms', roomRoutes)

// Listener
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})

// Global Error Handler
function globalErr(err, req, res, next) {
  console.error(err)
  res.status(err.status || 500).json({
    error: err.message || 'Server error',
  })
}

app.use(globalErr)
