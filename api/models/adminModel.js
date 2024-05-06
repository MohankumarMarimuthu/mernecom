import mongoose from "mongoose";

const adminSchema = mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    orderedItems: {
        type: Array,
        required: true,
    }
}, {timestamps: true})

const Admin = mongoose.model('Admin' , adminSchema) // always create singlurar with first letter uppercase like User

export default Admin;