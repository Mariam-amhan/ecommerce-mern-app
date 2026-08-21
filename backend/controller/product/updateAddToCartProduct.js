const addToCartModel = require("../../models/cartProduct");

const updateAddToCartProduct = async (req, res) => {
    try {
        const currentUserId = req.userId;  // Eğer kullanıcıya ait bir ürün güncelleniyorsa kullanılabilir
        const addToCartProductId = req.body._id;
        const qty = req.body.quantity;

        const updateProduct = await addToCartModel.updateOne(
            { _id: addToCartProductId },  // Filtre objesi
            { $set: { quantity: qty } }   // Güncellenecek veri
        );

        if (updateProduct.modifiedCount === 0) {
            return res.json({
                message: "Product not found or no changes made",
                error: true,
                success: false
            });
        }

        res.json({
            data: updateProduct,
            message: "Product updated successfully",
            error: false,
            success: true
        });

    } catch (err) {
        res.json({
            message: err.message || "Unknown error",
            error: true,
            success: false
        });
    }
};

module.exports = updateAddToCartProduct;
