import Admin from "../models/adminModel.js";
import Products from "../models/productModel.js"
import moment from 'moment'; 


export const createList = async(req, res, next) => {
    try{
      const listing = await Products.create(req.body)
      return res.status(201).json(listing)
    }
    catch(error){
      next(error)
    }
}

export const getAllProducts = async (req, res, next) => {
  try {
      const products = await Products.find();
      res.status(200).json(products);
  } catch (error) {
      next(error);
  }
};

export const delteListing = async(req, res, next) => {
  const { id } = req.body;
  try{
    await Products.findByIdAndDelete(id)
    return res.status(200).json({message: "listing has been delted"})
  }
  catch(error){
    next(error)
  }
}


export const todayOrders = async(req, res, next) => {
  try {
    // Get today's date in the format 'YYYY-MM-DD'
    const todayDate = moment().format('YYYY-MM-DD');

    // Find all documents in the Admin collection where orderedItems array contains items with today's date
    const orders = await Admin.find({ 'orderedItems.orderDate': todayDate });

    return res.status(200).json({ message: 'Today\'s orders fetched successfully', orders });
  } catch (error) {
    next(error);
  }
}

