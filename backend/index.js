import dotenv from 'dotenv';
dotenv.config();
import express from 'express'
import {connectDB} from '../backend/db.js'
import cors from 'cors'

import { authRouter } from './routes/auth.routes.js'
import { serviceRouter } from './routes/service.routes.js';
import { bookingRouter } from './routes/booking.routes.js';
connectDB();
const app= express()
app.use(express.json())

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
// app.use((err, req, res, next) => {
//   console.error("Unhandled Error:", err);
//   res.status(500).json({ error: "Something went wrong!" });
// });



app.use("/api/v1/auth",authRouter)
app.use("/api/v1/service",serviceRouter)
app.use("/api/v1/booking",bookingRouter)


app.listen(3001);