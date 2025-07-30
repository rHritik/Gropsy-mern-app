import express from 'express'
import { isAuthSeller, sellerLogin, sellerLogout } from '../controllers/seller.controller.js';
import { authSeller} from '../middleware/authSeller.js';



const router=express.Router();

router.post("/login", sellerLogin)
router.get("/logout",authSeller, sellerLogout  )
router.get("/is-auth", authSeller , isAuthSeller)

export default router;