const orderModel = require("../../models/orderModel");
async function getAllOrdersController(req, res) {
  try {
    const orders = await orderModel.find({})
      .populate("userId", "name email") 
      .populate("products.productId", "productName productImage price sellingPrice");

    res.json({
      message: "All orders (admin)",
      success: true,
      error: false,
      data: orders,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || "Server error",
      success: false,
      error: true,
    });
  }
}
module.exports = getAllOrdersController;
