import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import userRoutes from './routes/user.routes.js'
import dotenv from 'dotenv';

const app = express();
const PORT = 4000;

app.use(express.json())
app.use(cors({origin : "*"}));
dotenv.config();

const connectToMongoDB = async () => {
    try {
      await mongoose.connect("mongodb+srv://22eg110c10:rahul121@cluster0.7oymywe.mongodb.net/payment", {
        serverSelectionTimeoutMS: 5000
      });
      console.log('mongodb connected');
    } catch (error) {
      console.error('MongoDB connection error:', error);
    }
  };
connectToMongoDB();

app.use('/api/auth',userRoutes);
app.get('/favicon.ico', (req, res) => {
    res.status(204).end();
});


app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the API' });
});
  

app.listen(PORT, () => {
    console.log(`listening at http://localhost:${PORT}`)
})