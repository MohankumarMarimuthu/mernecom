import express from "express";
import { createList, delteListing, getAllProducts, todayOrders } from "../controllers/prodController.js";

const router = express.Router();

router.post("/create" , createList)
router.get("/getAllProducts" , getAllProducts)
router.delete('/delete' , delteListing)
router.get('/todayOrders' , todayOrders)


export default router;