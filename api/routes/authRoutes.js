import express from "express";
import { adminLogin, createAdmin, createShopper, userLogin } from "../controllers/authController.js";


const router = express.Router();

router.post("/user/signup" , createShopper)  // it is to create new users 
router.post("/admin/signup" , createAdmin)  // it is to create new admin 
router.post("/user/login" , userLogin)
router.post("/admin/login" , adminLogin)


export default router;
