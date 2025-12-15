import express from "express";
import authRoutes from "./routes/auth.routes";
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

console.log("JWT_SECRET:", process.env.JWT_SECRET)
const app = express()
const PORT = process.env.PORT || 3000

app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
}))
app.use(express.json())

app.use("/api/auth", authRoutes)

app.listen(PORT, ()=>{
    console.log(`Server Running on http://localhost:${PORT}`)
})