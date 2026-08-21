const orderModel = require("../../models/orderModel")
async function getOrdersController(req, res) {
    try {
        const userId = req.userId 
  const orders = await orderModel.find({ userId: req.userId })
  .populate("products.productId", "productName productImage price sellingPrice") 
        res.json({
            message: "all orders",
            success: true,
            error: false,
            data: orders,
         
        })  
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            success: false,
            error: true
        })
    }
}
module.exports = getOrdersController
