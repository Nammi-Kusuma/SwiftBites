import express from 'express'
import { forgotPassword, login, register, resetPassword } from '../controllers/userController.js'

const userRouter = express.Router();

userRouter.post('/register', register);
userRouter.post("/login", login);
userRouter.post("/forgot-password", forgotPassword)
userRouter.post("/reset-password/:userId/:token", resetPassword)

export default userRouter;