const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: String,
    profilePic: String,
    role: String,
    isVerified: { type: Boolean, default: false },
    verificationCode: String,
    googleId: { type: String, unique: true, sparse: true }, 
    resetPasswordToken: String,
}, {
    timestamps: true,
});
const userModel = mongoose.model("user", userSchema);
module.exports = userModel;