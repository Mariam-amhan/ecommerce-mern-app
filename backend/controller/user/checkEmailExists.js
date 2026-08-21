const userModel = require("../../models/userModel");

async function checkEmailExists(req, res) {
  try {
    const { email } = req.body;


    // Veritabanında email kontrolü
    const user = await userModel.findOne({ email });

    // Email varsa exists: true, yoksa exists: false döner
    res.status(200).json({
      exists: !!user, // user varsa true, yoksa false
      success: true,
      error: false,
    });

  } catch (err) {
    res.status(500).json({
      message: err.message || "Server error",
      success: false,
      error: true,
    });
  }
}

module.exports = checkEmailExists;