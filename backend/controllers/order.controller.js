import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import Address from "../models/address.model.js";
import stripe from"stripe";

// ===============================
// Place COD Order
// ===============================
export const placeOrderCOD = async (req, res) => {
  try {
    const userId = req.user;
    const { items, address } = req.body;

    if (!items || !address || items.length === 0) {
      return res
        .status(400)
        .json({ message: "Items and address are required", success: false });
    }

    // calculate total amount
    let amount = 0;
    for (let item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ message: "Product not found", success: false });
      }
      amount += product.offerPrice * item.quantity;
    }

    // add 2% tax
    amount += Math.floor((amount * 2) / 100);

    // create order
    await Order.create({
      userId,
      items,
      address,
      amount,
      paymentType: "COD",
      isPaid: false,
    });

    res.status(201).json({
      message: "Order placed successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ===============================
// Place Order stripe: /api/order/stripe
// ===============================

export const placeOrderStripe = async (req, res) => {
  try {
    const userId = req.user;
    const { items, address } = req.body;
    const{origin}=req.headers;

    if (!items || !address || items.length === 0) {
      return res
        .status(400)
        .json({ message: "Items and address are required", success: false });
    }

    let productData=[];
    let amount = 0;
    for (let item of items) {
      const product = await Product.findById(item.product);
      productData.push({
        name:product.name,
        price: product.offerPrice,
        quantity:item.quantity,   
      })
      if (!product) {
        return res.status(404).json({ message: "Product not found", success: false });
      }
      amount += product.offerPrice * item.quantity;
    }

    // add 2% tax
    amount += Math.floor((amount * 2) / 100);

    // create order
    const order=
    await Order.create({
      userId,
      items,
      address,
      amount,
      paymentType: "Online",
      isPaid: true,
    });

    // stripe gateway intialize
    const stripeInstance=new stripe(process.env.STRIPE_SECRET_KEY);

    // create line item for stripe

    const line_items=productData.map((item)=>{
      return{
        price_data:{
          currency:"usd",
          product_data:{
            name:item.name
          }, unit_amount:Math.floor(item.price*item.price*0.02)*100,
        },
        quantity: item.quantity,
      };
    });

    // create session
    const session=await stripeInstance.checkout.sessions.create({
      line_items,
      mode:"payment",
      success_url: `${origin}/loader?next=MyOrders`,
      cancel_url: `${origin}/cart`,
      metadata:{
        orderId: order._id.toString(), 
        userId
      },

    });


    res.status(201).json({
      message: "Order placed successfully",
      success: true,
      url:session.url,
    });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



// ===============================
// Get Orders for Individual User
// ===============================
export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user;

    const orders = await Order.find({
      userId,
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    }).sort({ createdAt: -1 });

    // manually populate products & address
    const enrichedOrders = await Promise.all(
      orders.map(async (order) => {
        const items = await Promise.all(
          order.items.map(async (item) => {
            const product = await Product.findById(item.product);
            return { ...item.toObject(), product };
          })
        );

        const address = await Address.findById(order.address);

        return { ...order.toObject(), items, address };
      })
    );

    res.status(200).json({
      success: true,
      orders: enrichedOrders,
    });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ===============================
// Get All Orders (Admin/Seller)
// ===============================
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    }).sort({ createdAt: -1 });

    // manually populate
    const enrichedOrders = await Promise.all(
      orders.map(async (order) => {
        const items = await Promise.all(
          order.items.map(async (item) => {
            const product = await Product.findById(item.product);
            return { ...item.toObject(), product };
          })
        );

        const address = await Address.findById(order.address);

        return { ...order.toObject(), items, address };
      })
    );

    res.status(200).json({
      success: true,
      orders: enrichedOrders,
    });
  } catch (error) {
    console.error("Error fetching all orders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
