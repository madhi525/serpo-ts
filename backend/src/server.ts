import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import dataRoutes from './routes/dataRoutes';


dotenv.config();

const cors = require('cors');
const app = express();
const PORT = process.env.PORT as string;
const MONGO_URI = process.env.MONGO_URI as string;

app.use(cors());
app.use(express.json());


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