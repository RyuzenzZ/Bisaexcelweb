import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import { errorHandler, notFoundHandler } from './middlewares/errorHandler.js'
import { apiRouter } from './routes/api.js'

dotenv.config()

const app = express()
const port = Number(process.env.PORT ?? 8000)
const allowedOrigins = new Set([
  process.env.FRONTEND_URL ?? 'http://localhost:3000',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://localhost:3001',
  'http://127.0.0.1:3001',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
])

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.has(origin)) {
      callback(null, true)
      return
    }

    callback(new Error(`Origin tidak diizinkan oleh CORS: ${origin}`))
  },
}))
app.use(express.json())
app.use('/api/v1', apiRouter)
app.use(notFoundHandler)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`BisaExcel API berjalan di http://localhost:${port}`)
})
