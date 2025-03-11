import express from "express"
import dotenv from "dotenv/config"
import router from "./routes/auth.route.js"
import cookieParser from "cookie-parser"
import { connnectDB } from "./lib/dbConnection.js"
import messageRoute from "./routes/message.route.js"

const app = express()
connnectDB()

const PORT = process.env.PORT

app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', router)
app.use('/api/message', messageRoute)

app.listen(PORT, () => { console.log(`server started on port : ${PORT}`)})