const authCallback = (req, res) => {
    const { token } = req.user; 
    const tokenOption = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    };
    res.cookie("token", token, tokenOption)
       .redirect(`${process.env.FRONTEND_URL}/`);
};

module.exports = authCallback;