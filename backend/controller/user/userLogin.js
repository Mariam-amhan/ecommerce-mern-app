const userModel = require("../../models/userModel");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8080/api/auth/google/callback",
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        let user = await userModel.findOne({ googleId: profile.id });

        if (!user) {
          user = await userModel.findOne({ email });
          if (!user) {
            user = await new userModel({
              googleId: profile.id,
              email: email,
              name: profile.displayName,
              isVerified: true,
              role: "GENERAL",
              password: "",
            }).save();
          } else {
            user.googleId = profile.id;
            await user.save();
          }
        }

        const tokenData = { _id: user._id, email: user.email };
        const token = await JWT.sign(tokenData, process.env.TOKEN_SECRET_KEY, {
          expiresIn: "8h",
        });

        return done(null, { user, token });
      } catch (err) {
        return done(err, null);
      }
    },
  ),
);

async function userLogin(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("please provide all required fields");
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      throw new Error("User Not Found");
    }

    if (!user.isVerified) {
      throw new Error("please Verify your email to login");
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (checkPassword) {
      const tokenData = {
        _id: user._id,
        email: user.email,
      };

      const token = await JWT.sign(tokenData, process.env.TOKEN_SECRET_KEY, {
        expiresIn: "8h",
      });

      const tokenOption = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      };

      res.cookie("token", token, tokenOption).json({
        message: "Login Successfully",
        data: token,
        success: true,
        error: false,
      });
    } else {
      throw new Error("Please Check Your Password");
    }
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      success: false,
      error: true,
    });
    console.log(err);
  }
}

module.exports = userLogin;
