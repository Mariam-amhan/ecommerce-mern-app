const orderModel = require("../../models/orderModel");
const deleteOrder = async (req,res) => {
    try {
        const {_id} = req.body
        const deletedOrder = await orderModel.findByIdAndDelete(_id)
        res.status(200).json({
            message: "Order Deleted Successfully!",
            success: true,
            error: false,
            data: deletedOrder
        })  
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            success: false,
            error: true
        })
    }
}
module.exports = deleteOrder