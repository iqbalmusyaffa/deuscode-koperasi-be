import express from 'express'
import bodyParser from 'body-parser'
import routes from './routes/index.js'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import path from 'path'
import { fileURLToPath } from 'url'

const app = express()

// Middleware untuk akses .env
dotenv.config()

// Middleware untuk membaca request json
app.use(bodyParser.json())

// Middleware untuk parse cookie
app.use(cookieParser())

const corsOption = {
  origin: 'http://localhost:8080',
  credentials: true
}

// Middleware CORS
app.use(cors(corsOption))

//path
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
// Routes
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use('/api', routes)


const PORT = process.env.PORT != null ? parseInt(process.env.PORT) : 3000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

export default app
