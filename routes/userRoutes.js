import express from 'express';
import { current, login, register } from '../controllers/userController.js';
import { validateTokenHandler } from '../middlewares/validateTokenHandler.js';

const userRoute = express.Router();

userRoute.get('/current', validateTokenHandler,  current);
userRoute.post('/register', register);
userRoute.post('/login', login);

export default userRoute;