const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const userModel = require("../../models/userModel");

const JWT_SECRET = process.env.TOKEN_SECRET_KEY;

const ForgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error("user Not Found");
    }

    // JWT token oluştur
    const resetToken = jwt.sign(
      { userId: user._id }, // Token’a kullanıcı ID’sini ekliyoruz
      JWT_SECRET,
      { expiresIn: "1h" } // Token 1 saat geçerli
    );

    // Token’ı veritabanına kaydet
    user.resetPasswordToken = resetToken;
    await user.save();

    // E-posta gönderimi
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      to: email,
      from: process.env.EMAIL_USER,
      subject: "Reset Password",
      text: `For Reset Your Password Please Cklck on This Url
             http://localhost:3000/reset-password?token=${resetToken}`,
    };

    await transporter.sendMail(mailOptions);
    res.json({
      message: "Password Reset Link Sended Successfully ",
      success: true,
      error: false,
    });
  } catch (err) {
    res.json({
      message: err.message || err,
      success: false,
      error: true,
    });
  }
};

module.exports = ForgotPassword;
