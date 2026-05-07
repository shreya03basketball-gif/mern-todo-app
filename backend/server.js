import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import { fileURLToPath } from "url"
import { dirname, join } from "path"

import userRouter from "./routes/userRoute.js"
import taskRouter from "./routes/taskRoute.js"
import forgotPasswordRouter from "./routes/forgotPassword.js"

//app config
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
dotenv.config()
const app = express()
const port = process.env.PORT || 8001
mongoose.set('strictQuery', true);

//middlewares
app.use(express.json())
app.use(cors())

//db config
const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI
if (!mongoUri) {
    console.error('Missing MongoDB connection string. Set MONGODB_URI in .env.')
    process.exit(1)
}

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
}, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log("DB Connected")
    }
})

//api endpoints
app.use("/api/user", userRouter)
app.use("/api/task", taskRouter)
app.use("/api/forgotPassword", forgotPasswordRouter)

//listen
app.listen(port, () => console.log(`Listening on localhost:${port}`))