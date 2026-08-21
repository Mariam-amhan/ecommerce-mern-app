const tempUsers = require("../../utils/tempUser")
const userModel = require("../../models/userModel")
async function verifyEmail(req,res){
    try {
        const {email, code} = req.body
        const tempUser = tempUsers.get(email)
        console.log(`temp user for ${email}:`, tempUser)
        console.log(`received code: ${code}, stored code :${tempUser?.verificationCode}`)
        if(!tempUser){
            throw new Error("User not found of verification expired")
        }
        if(tempUser.verificationCode !== code){
            throw new Error("Invalid verification code please check again")
        }
        const newUser = new userModel({
            name: tempUser.name,
            email: tempUser.email,
            password: tempUser.password,
            role: tempUser.role,
            isVerified: true,
            verificationCode: null
        })
        await newUser.save()
        tempUsers.delete(email)

        res.status(200).json({
            success: true,
            error: false,
            message: "Email Verified successfully"
        })
    } catch (err) {
        res.json({
            message: err.message || err,
            success: false,
            error: true})}}
module.exports = verifyEmail
