import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import { connectDB } from './connection/Db.js';
import adminRoutes from './routes/adminRoutes.js'
import userRoutes from './routes/userRoutes.js'
import formRoutes from './routes/formRoutes.js'

const PORT = process.env.PORT || 8080
const app = express();

const corsOptions = {
    origin: process.env.FRONTEND_URI,
    credentials: true,
    methods: ["GET", "POST", "DELETE", "UPDATE", "OPTION", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
}

app.use(express.json());

app.use(cors(corsOptions))
app.use(cookieParser())

app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);
app.use('/api/form', formRoutes)


connectDB()
app.listen(PORT, () => console.log(`Server started at ${PORT}`))

