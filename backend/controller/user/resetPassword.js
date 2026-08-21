const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const userModel = require("../../models/userModel");

const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    // Token’ı doğrula
    let decoded;
    try {
      decoded = JWT.verify(token, process.env.TOKEN_SECRET_KEY);
    } catch (err) {
      return res.status(400).json({
        message: "Geçersiz veya süresi dolmuş token",
        success: false,
        error: true,
      });
    }

    // Kullanıcıyı token’daki userId ve resetPasswordToken ile bul
    const user = await userModel.findOne({
      _id: decoded.userId,
      resetPasswordToken: token,
    });

    if (!user) {
      return res.status(400).json({
        message: "Geçersiz token",
        success: false,
        error: true,
      });
    }

    // Şifreyi hash’le
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(newPassword, salt);

    // Güncellenecek veriyi hazırla
    const payload = {
      password: hashedPassword,
      resetPasswordToken: undefined,
    };

    // Kullanıcıyı güncelle
    const updatedUser = await userModel.findByIdAndUpdate(
      decoded.userId,
      payload,
      { new: true }
    );

    // Başarılı yanıt
    res.status(200).json({
      data: updatedUser,
      success: true,
      error: false,
      message: "Şifreniz başarıyla sıfırlandı!",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || "Bir hata oluştu",
      success: false,
      error: true,
    });
  }
};

module.exports = resetPassword;