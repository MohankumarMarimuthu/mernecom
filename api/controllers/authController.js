import Admin from "../models/adminModel.js";
import Shopper from "../models/shopperModel.js";
import { errorHandler } from "../utils/error.js"


export const createShopper = async(req, res, next) => {
    const { email, password } = req.body;
    const newUser = new Shopper({ email, password});
    try{
        await newUser.save();
        res.status(201).json("new user added successfully")
    }
    catch(error){
        console.log('error')
    }
}
export const createAdmin = async(req, res, next) => {
    const { email, password } = req.body;
    const newAdmin = new Admin({ email, password});
    try{
        await newAdmin.save();
        res.status(201).json("Admin added successfully")
    }
    catch(error){
        console.log('error')
    }
}

export const userLogin = async(req, res, next) => {
    const { email , password } = req.body
    try{
        const validateShopper = await Shopper.findOne({ email })
        if(!validateShopper) return next(errorHandler(404 , 'User not found'));

        if(password !== validateShopper.password) {
            return next(errorHandler(401, 'Invalid credentials'));
        }

        res.status(200).send({ message: "user loggged in successfully"})
    }
    catch(error){
        next(error)
    }
}

export const adminLogin = async(req, res, next) => {
    const { email , password } = req.body
    try{
        const validateAdmin = await Admin.findOne({ email })
        if(!validateAdmin) return next(errorHandler(404 , 'User not found'));

        if(password !== validateAdmin.password) {
            return next(errorHandler(401, 'Invalid credentials'));
        }

        res.status(200).send({ message: "admin loggged in successfully"})
    }
    catch(error){
        next(error)
    }

}