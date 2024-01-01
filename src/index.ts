import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import authRoutes from './routes/auth.routes'
import noteRoutes from './routes/note.routes'
import rateLimit from 'express-rate-limit'

const app = express()

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later.',
})

app.use(limiter)

app.use(bodyParser.json())

// Connect to MongoDB using the new connection string format
mongoose.connect('mongodb://localhost:27017/note-taking-app', {
  connectTimeoutMS: 10000,
})

app.use('/auth', authRoutes)
app.use('/api', noteRoutes)

const PORT = 3000

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
