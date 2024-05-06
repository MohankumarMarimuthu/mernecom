import Admin from "../models/adminModel.js";
import Products from "../models/productModel.js";
import Shopper from "../models/shopperModel.js";
import moment from 'moment';

export const addToCart = async(req, res, next) => {
    const { email, productId , quantity} = req.body;

  try {
    // Find the shopper document using the provided email
    let shopper = await Shopper.findOne({ email });

    // If the shopper doesn't exist, return an error
    if (!shopper) {
      return res.status(404).json({ message: 'user not found' });
    }

    // Find the product details using the provided product ID
    let product = await Products.findById(productId);

    if (quantity > product.quantity) {
        return res.status(400).json({ message: 'Desired quantity not available' });
    }

    // Add the product details to the shopper's cartItems array
    const cartItem = {
        productId: product._id,
        name: product.name,
        description: product.description,
        price: product.price,
        quantity: quantity,
        image: product.image
    };
      
    shopper.cartItems.push(cartItem);

    // Save the updated shopper document
    product.quantity -= quantity;

    // Save the updated product and shopper documents
    await product.save();
    shopper = await shopper.save();

    return res.status(200).json({ message: 'Product added to cart successfully' , shopper});
  } catch (error) {
    next(error)
  }
}

export const removeFromCart = async(req, res, next) => {
    const { email, productId } = req.body;

    try {
      // Find the shopper document using the provided email
      let shopper = await Shopper.findOne({ email });
  
      // If the shopper doesn't exist, return an error
      if (!shopper) {
        return res.status(404).json({ message: 'user not found' });
      }

      // Find the index of the product in the shopper's cartItems array
      const index = shopper.cartItems.findIndex(item => item.productId == productId);

      // Remove the product from the shopper's cartItems array
      const removedQuantity = shopper.cartItems[index].quantity;
   
      const removedItem = shopper.cartItems.splice(index, 1);
  
      // Save the updated shopper document
      const product = await Products.findById(removedItem[0].productId);
      product.quantity += removedQuantity;
      
      await product.save();
      shopper = await shopper.save();
  
      return res.status(200).json({ message: 'Product removed from cart', shopper });
    } catch (error) {
      next(error)
    }
}

export const fetchCart = async(req, res, next) => {
    const { email } = req.body;
    try{
        const shopper = await Shopper.findOne({ email });
    
        // If the shopper doesn't exist, return an error
        if (!shopper) {
          return res.status(404).json({ message: 'User not found' });
        }
        
        // Return the cartItems array from the shopper document
        return res.status(200).json({ cartItems: shopper.cartItems });
    }
    catch(error){
        next(error)
    }
}

export const checkOut = async(req, res, next) => {
    const { email } = req.body;

    try {
      // Find the shopper document using the provided email
      let shopper = await Shopper.findOne({ email });
  
      // Move items from cartItems to orderedItems
      shopper.orderedItems = [...shopper.cartItems];

      // Add the current date to each ordered item
      const currentDate = moment().format('YYYY-MM-DD');
      shopper.orderedItems.forEach(item => {
        item.orderDate = currentDate;
      });


      // Empty the cartItems array
      shopper.cartItems = [];
  
      // Save the updated shopper document
      shopper = await shopper.save();
  
      // Update the Admin model's orderedItems array
      let admin = await Admin.findOne({ email: 'admin@coupa.com' }); // Replace 'admin@example.com' with the actual email of the admin
    
     // If the admin document exists, push the ordered items to the existing array
      admin.orderedItems.push(...shopper.orderedItems);

      // Save the updated admin document
      admin = await admin.save();

      return res.status(200).json({ message: 'Checkout successful', shopper, admin });
    }
    catch(error){
        next(error)
    }  
  
}