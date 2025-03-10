import express from "express"
import dotenv from "dotenv/config"
import router from "./routes/auth.route.js"
import cookieParser from "cookie-parser"
import { connnectDB } from "./lib/dbConnection.js"

const app = express()
connnectDB()

const PORT = process.env.PORT

app.use(express.json())
app.use(cookieParser())
app.use('/api/auth', router)

app.listen(PORT, () => { console.log(`server started on port : ${PORT}`)})