const userModel = require("../../models/userModel");
const bcrypt = require("bcryptjs");
const tempUsers = require("../../utils/tempUser");
const sendVerificationEmail = require("../../utils/emailSender");

async function userSignUp(req, res) {
  try {
    const { name, email, password } = req.body;

    if ((!email, !name, !password)) {
      throw new Error("please provide all required fields");
    }

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      throw new Error("This User Already Exists");
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    const verificationCode = Math.floor(
      100000 + Math.random() * 900000,
    ).toString();
    console.log(
      `Genereted verification code for ${email} : ${verificationCode}`,
    );

    const tempUser = {
      name,
      email,
      password: hashPassword,
      role: "GENERAL",
      verificationCode,
      isVerified: false,
    };

    tempUsers.set(email, tempUser);
    console.log(`stored tempuser for ${email}:`, tempUsers.get(email));

    await sendVerificationEmail(name, email, verificationCode);

    res.status(200).json({
      success: true,
      error: false,
      message: "Please check your email for verificatin code",
    });
  } catch (err) {
    res.json({
      message: err.message || err,
      success: false,
      error: true,
    });
  }
}

module.exports = userSignUp;
