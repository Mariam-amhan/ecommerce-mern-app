const express = require("express");

const router = express.Router();
const authToken = require("../middleware/authToken");
const userSignUp = require("../controller/user/userSignUp");
const verifyEmail = require("../controller/user/verifyEmail");
const checkEmailExists = require("../controller/user/checkEmailExists");
const userLogin = require("../controller/user/userLogin");
const ForgotPassword = require("../controller/user/forgotPassword");
const resetPassword = require("../controller/user/resetPassword");
const deleteUser = require("../controller/user/deleteUser");
const authCallback = require("../helpers/authCallback");
const changePassword = require("../controller/user/UpdatePassword");
const userDetails = require("../controller/user/userDetails");
const userLogout = require("../controller/user/userLogout");
const getAllUsers = require("../controller/user/getAllUsers");
const updateUser = require("../controller/user/updateUser");
const passport = require("passport");

const uploadProductController = require("../controller/product/uploadProduct");
const getProductController = require("../controller/product/getProduct");
const updateProductController = require("../controller/product/updateProduct");
const getCategoryProduct = require("../controller/product/getCategoryProduct");
const getCategoryWiseProdcut = require("../controller/product/getCategoryWiseProduct");
const getProductDetails = require("../controller/product/getProductDetails");
const addToCartController = require("../controller/product/addToCartController");
const countAddToCartProduct = require("../controller/product/countAddToCartProduct");
const addToCartViewProduct = require("../controller/product/addToCartViewProduct");
const updateAddToCartProduct = require("../controller/product/updateAddToCartProduct");
const deleteAddToCartProduct = require("../controller/product/deleteAddToCartProduct");
const searchProduct = require("../controller/product/searchProduct");
const filterProductController = require("../controller/product/filterProduct");
const deleteProduct = require("../controller/product/deleteProduct");
const createOrderController = require("../controller/order/createOrderController");
const getOrdersController = require("../controller/order/getOrderController");
const getAllOrdersController = require("../controller/order/getAllOrders");
const deleteOrder = require("../controller/order/deleteOrder");

router.post("/signup", userSignUp);
router.post("/verify-email", verifyEmail);
router.post("/check-email", checkEmailExists);
router.post("/login", userLogin);
router.get("/user-details", authToken, userDetails);
router.get("/user-logout", userLogout);
router.get("/all-users", authToken, getAllUsers);
router.post("/update-user", authToken, updateUser);
router.post("/update-password", changePassword )
router.post("/forgot-password", ForgotPassword)
router.post("/reset-password", resetPassword)
router.post("/delete-user", authToken, deleteUser)


// product

router.post("/upload-Product", authToken, uploadProductController)
router.get("/get-product", getProductController)
router.post("/update-product",authToken,updateProductController)
router.post("/delete-product", authToken, deleteProduct)
router.get("/get-categoryProduct",getCategoryProduct )
router.post("/category-product", getCategoryWiseProdcut)
router.post("/product-details", getProductDetails)
router.get("/search", searchProduct)
router.post("/filter-product", filterProductController)



// user add to cart

router.post("/addtocart", authToken, addToCartController)
router.get("/countAddToCartProduct", authToken, countAddToCartProduct)
router.get("/view-cart-product", authToken, addToCartViewProduct)
router.post("/updateCartProduct", authToken, updateAddToCartProduct)
router.post("/delete-cart-product", authToken, deleteAddToCartProduct)


// order 
router.post("/order",authToken, createOrderController)
router.get("/get-orders", authToken, getOrdersController)
router.get("/get-all-orders",authToken, getAllOrdersController)
router.post("/delete-order", authToken, deleteOrder)




router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/auth/google/callback", 
    passport.authenticate("google", { session: false, failureRedirect: `${process.env.FRONTEND_URL}/login` }),
    authCallback
)
module.exports = router;
