import express from 'express'
import { isAuthUser, loginUser, logoutUser, registerUser } from '../controllers/user.controller.js';
import { authUser } from '../middleware/authUser.js';


const router=express.Router();
router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/logout", authUser, logoutUser);
router.get("/is-auth", authUser, isAuthUser)




export default router