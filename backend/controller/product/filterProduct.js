const productModel = require("../../models/ProductModel")

const filterProductController = async(req,res) => {
    try {

    const categoryList = req?.body?.category || []
    
    const product = await productModel.find({
        category : {
            "$in" : categoryList
        }
    })

    res.json({
        data : product,
        message: "product",
        error: false,
        success: true
    })
    } catch (err) {

        res.json({
            message: err.message || error,
            success: false,
            error: true
        })
        
    }
}

module.exports = filterProductController