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

mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('mongodb connected'))
.catch(() => console.error('MongoDB connection error:', err));

app.use('/api/auth',userRoutes);


app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the API' });
});
  

app.listen(PORT, () => {
    console.log(`listening at http://localhost:${PORT}`)
})