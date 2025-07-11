const Order = require('../Models/Order');
const Product = require('../Models/Plants');

exports.createOrder = async (req, res) => {
  try {
    
    const { userId, items } = req.body;
     console.log("Order received in controller:", req.body); 

    if (!userId || !items || !items.length) {
      return res.status(400).json({ message: 'Invalid order data' });
    }

    let totalPrice = 0;

    // Validate products and calculate total
    for (const item of items) {
      const product = await Product.findById(item.productId); // Add await

      if (!product) {
        return res.status(404).json({ message: `Product not found for ID ${item.productId}` });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({ message: `Insufficient stock for ${product.name}` });
      }

      totalPrice += product.price * item.quantity;
    }

    // Deduct stock
    for (const item of items) {
      await Product.findByIdAndUpdate(item.productId, {
        $inc: { stock: -item.quantity },
      });
    }

    // Create and save order
    const order = new Order({
      userId,
      items,
      totalPrice,
      status: 'Pending',
    });

    await order.save();
    console.log(order);
    

    res.status(201).json({ message: 'Order placed successfully', orderId: order._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
