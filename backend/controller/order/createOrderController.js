const orderModel = require("../../models/orderModel");
const cartProductModel = require("../../models/cartProduct");
async function createOrderController(req, res) {
  try {
    const userId = req.userId;
    const { orderItems, shippingAddress, phoneNumber, customerName } = req.body;

    if (!orderItems || orderItems.length === 0) {
      throw new Error("The cart cannot be empty");
    }
    const products = orderItems.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
    }));
    const newOrder = new orderModel({
      userId,
      products,
      customerName: customerName,
      address: shippingAddress,
      phoneNumber,
      status: "Order Accepted ",
    });
    const savedOrder = await newOrder.save();
    await cartProductModel.deleteMany({ userId });
    res.status(201).json({
      message: "Order successfully created",
      success: true,
      error: false,
      data: savedOrder,
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      message: err.message || "The order could not be created",
      success: false,
      error: true,
    });
  }
}
module.exports = createOrderController;
