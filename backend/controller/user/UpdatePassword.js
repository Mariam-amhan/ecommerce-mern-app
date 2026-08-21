const bcrypt = require("bcryptjs");
const userModel = require("../../models/userModel");

async function changePassword(req, res) {
  try {
    const { userId, newPassword } = req.body; // password yerine newPassword kullanıyoruz

    
    if (!userId || !newPassword) {
      throw new Error("User ID and new password are required");
    }

   
    const user = await userModel.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

 
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(newPassword, salt);

   
    const payload = {
      password: hashPassword, 
    };

  
    const updatePassword = await userModel.findByIdAndUpdate(
      userId,
      payload,
      { new: true }
    );

    res.json({
      data: updatePassword,
      success: true,
      error: false,
      message: "Password updated successfully!",
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || "An error occurred",
      success: false,
      error: true,
    });
  }
}

module.exports = changePassword;