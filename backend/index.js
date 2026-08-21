const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const router = require("./routes");
const passport = require("passport"); // Passport'ı burada ekle

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use(passport.initialize()); // Passport'ı başlat
app.use("/api", router);

const PORT = process.env.PORT || 8080;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server is running on port", PORT);
        console.log("Connected successfully to DB");
    });
});