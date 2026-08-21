const userModel = require("../../models/userModel")

async function userDetails(req,res){
    try {
        
        const user = await userModel.findById(req.userId)

        res.status(200).json({
            data: user,
            success: true,
            error: false,
            message: "user Details"
        })
        
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            success: false,
            error: true,
        })
    }
}

module.exports = userDetails