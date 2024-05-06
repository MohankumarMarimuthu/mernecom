import express from "express";
import mongoose from "mongoose";
import authRouter from "./routes/authRoutes.js"
import productRouter from "./routes/productRoutes.js"
import shopperRouter from "./routes/shopperRoutes.js"
import dotenv from "dotenv"
import path from "path";
dotenv.config()


const app = express();
app.use(express.json()); 


mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@ecom-mern.zxhvgjv.mongodb.net/?retryWrites=true&w=majority&appName=ecom-mern`).then(() => {
  console.log("database connected")
  app.listen(4000 , () => {
    console.log("server started and listening to the port 4000!!")
})
}).catch(error => console.log('errr' , error))

const __dirname = path.resolve();

app.use("/api/auth" , authRouter)
app.use("/api/product" , productRouter)
app.use("/api/shopper" , shopperRouter)

app.use(express.static(path.join(__dirname, '/client/build')))

app.get('*' , (req, res) => {
  res.sendFile(path.join(__dirname, 'client' , 'build' , 'index.html'));
})

// it is middleware
app.use((err, req, res, next) => { 
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
})

