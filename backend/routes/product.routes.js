import express from 'express'
import { authSeller} from '../middleware/authSeller.js';
import { addProduct, changeStock, getProductById, getProduct } from '../controllers/product.controller.js';
import { upload } from '../config/multer.js';



const router=express.Router();


router.post("/add-product", authSeller ,upload.array("image" ,4), addProduct);
router.get("/list", getProduct);
router.get("/id", getProductById);
router.post("/stock",authSeller, changeStock);




export default router;