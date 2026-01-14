import express from 'express';
import blogRoute from './routes/blogRoutes.js';
import { errorMiddleware } from './middlewares/errorMiddleware.js';
import connectDB from './config/dbConnection.js';
import userRoute from './routes/userRoutes.js';

connectDB();

const app = express();

app.use(express.json());

app.use('/blogs', blogRoute);
app.use('/users', userRoute);

app.use(errorMiddleware);

export default app;