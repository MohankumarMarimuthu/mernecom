import express from "express";
import { addToCart, checkOut, fetchCart, removeFromCart } from "../controllers/shopperController.js";


const router = express.Router();

router.post("/addToCart" , addToCart)
router.delete("/removeFromCart" , removeFromCart)
router.post("/getCartItems" , fetchCart)
router.post("/checkout" , checkOut)

export default router;