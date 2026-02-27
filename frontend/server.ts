import express, { Request, Response } from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

// __dirname / __filename (ESM)
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = Number(process.env.PORT) || 3000

// 👉 dist 디렉토리 자체가 정적 루트
app.use(express.static(__dirname))
console.log('Static files served from:', __dirname)

// Vue SPA fallback
app.use((req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})

process.on('SIGINT', () => {
  server.close(() => {
    console.log('Server closed')
    process.exit(0)
  })
})
