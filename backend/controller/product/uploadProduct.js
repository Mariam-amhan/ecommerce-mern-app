const uploadProductPermission = require("../../helpers/permission")
const productModel = require("../../models/ProductModel")
async function uploadProductController(req,res) {
    try {
        const sessionUserId = req.userId
        if(!uploadProductPermission(sessionUserId)){
            
            throw new Error("Permission denied")
        }
        const uploadProduct = new productModel(req.body)
        const saveProduct = await uploadProduct.save()
        res.status(201).json({
            message: "product Upload Successfully",
            error: false,
            success: true,
            data: saveProduct
        })     
    } catch (err) {
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })       
    }   
}
module.exports = uploadProductController