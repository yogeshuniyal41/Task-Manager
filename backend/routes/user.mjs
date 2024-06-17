import express from 'express';
import UserController from '../controllers/userController.mjs';

const userRouter = express.Router();

// Middleware to parse JSON request bodies
userRouter.use(express.json());

// Define the login route
userRouter.post('/login', UserController.login);

// Define the signup route
userRouter.post('/signup', UserController.signup);

userRouter.post('/logout', UserController.logout);

export default userRouter;
