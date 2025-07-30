import express from"express";
import { authUser } from "../middleware/authUser.js";
import { addAddress, getAddress } from "../controllers/address.controller.js";

const router=express.Router();

router.post ("/add",authUser,addAddress);
router.get ("/get",authUser,getAddress);



export default router;