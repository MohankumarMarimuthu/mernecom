import mongoose from "mongoose";

const shopperSchema = mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    cartItems: {
        type: Array,
        required: true,
    }
}, {timestamps: true})

const Shopper = mongoose.model('Shopper' , shopperSchema) 

export default Shopper;