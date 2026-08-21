const userModel = require("../../models/userModel");

async function updateUser(req, res) {
  try {
    const sessionUser = req.userId;
    const { userId, name, email, role } = req.body;

    // Yetkilendirme kontrolü (isteğe bağlı)
    const user = await userModel.findById(sessionUser);
    if (!user || user.role !== "ADMIN") {
      return res.status(403).json({
        message: "You are not authorized to update users",
        success: false,
        error: true,
      });
    }

    const payload = {
      ...(email && { email: email }),
      ...(name && { name: name }),
      ...(role && { role: role }),
    };

    const updateUser = await userModel.findByIdAndUpdate(userId, payload, { new: true });

    if (!updateUser) {
      return res.status(404).json({
        message: "User not found",
        success: false,
        error: true,
      });
    }

    res.json({
      data: updateUser,
      success: true,
      error: false,
      message: "User Role Updated!",
    });
  } catch (err) {
    console.error("Update user error:", err);
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: true,
    });
  }
}

module.exports = updateUser;