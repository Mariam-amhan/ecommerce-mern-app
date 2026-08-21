async function userLogout(req,res){
    try {

        res.clearCookie("token")

        res.json({
            message: "Logged out successfully",
            error: false,
            success: true,
            data: []
        })
        
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            success: false,
            error: true
        })
    }
}

module.exports = userLogout