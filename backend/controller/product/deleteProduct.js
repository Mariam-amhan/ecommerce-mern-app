const productModel = require("../../models/ProductModel")
const deleteProduct = async (req,res) => {
    try {
        const {_id} = req.body
        const deletedProduct = await productModel.findByIdAndDelete(_id)
        res.status(200).json({
            message: "Product Deleted Successfully!",
            success: true,
            error: false,
            data: deletedProduct
        })
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            success: false,
            error: true
        })
    }
}
module.exports = deleteProduct