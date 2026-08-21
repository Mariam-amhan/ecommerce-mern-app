const addToCartModel = require("../../models/cartProduct")

const deleteAddToCartProduct = async(req,res) => {
    try {

        const currentUserId = req.currentUserId
        const addToCartProductId = req.body._id

        const deleteProduct = await addToCartModel.deleteOne({_id: addToCartProductId})

        res.json({
            data: deleteProduct,
            message: "product deleted from cart",
            success: true,
            error: false
        })
        
    } catch (err) {
        res.json({
            message: err.message || error,
            error: true,
            success: false
        })
    }
}

module.exports = deleteAddToCartProduct