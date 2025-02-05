import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import authRoutes from './routes/login-auth-routes';
import dataRoutes from './routes/dataRoutes';
import cors from 'cors';


dotenv.config();

const app = express();
const PORT = process.env.PORT as string;
const MONGO_URI = process.env.MONGO_URI as string;

app.use(express.json());

app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
  }));

mongoose
.connect(MONGO_URI)
.then(() => console.log('connected to mongoDB'))
.catch(err => console.error('MongoDB connection failed:', err));

app.use('/auth', authRoutes);
app.use('/data', dataRoutes);

app.get('/', (req, res) => {
    res.send('Respond from backend');
});

app.post('/', (req, res) => {
    res.send('Respond from backend');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});