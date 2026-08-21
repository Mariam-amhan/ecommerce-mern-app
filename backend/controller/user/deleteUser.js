const userModel = require("../../models/userModel")


const deleteUser = async (req,res) => {
    try {

        const {_id} = req.body


        const deletedUser = await userModel.findByIdAndDelete(_id)

        res.status(200).json({
            message: "User Deleted Successfully!",
            success: true,
            error: false,
            data: deletedUser
        })
        
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            success: false,
            error: true
        })
    }
}


module.exports = deleteUser