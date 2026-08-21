const userModel = require("../../models/userModel")
async function getAllUsers(req,res){
    try {
        

        const allUsers = await userModel.find()

        res.json({
            message: "All Users",
            success: true,
            error: false,
            data: allUsers
        })




    } catch (err) {
        res.json({
            message: err.message || err,
            success: false,
            error: true
        })
    }
}

module.exports = getAllUsers