const backendDomain = "http://localhost:8080";

const SummaryApi = {
  signUp: {
    url: `${backendDomain}/api/signup`,
    method: "post",
  },
  verifyEmail: {
    url: `${backendDomain}/api/verify-email`,
    method: "post",
  },
  ChekEmail: {
    url: `${backendDomain}/api/check-email`,
    method: "post",
  },
  userLogin: {
    url: `${backendDomain}/api/login`,
    method: "post",
  },
  currentUser: {
    url: `${backendDomain}/api/user-details`,
    method: "get",
  },
  userLogout: {
    url: `${backendDomain}/api/user-logout`,
    method: "get",
  },
  allUsers: {
    url: `${backendDomain}/api/all-users`,
    method: "get",
  },
  updateUser: {
    url: `${backendDomain}/api/update-user`,
    method: "post",
  },
  updatePassword: {
    url: `${backendDomain}/api/update-password`,
    method: "post",
  },
  forgotPassword: {
    url: `${backendDomain}/api/forgot-password`,
    method: "post"
  },
  resetPassword: {
    url: `${backendDomain}/api/reset-password`,
    method: "post"
  },
  deleteUser: {
    url: `${backendDomain}/api/delete-user`,
    method: "post"
  },
  uploadProduct: {
    url: `${backendDomain}/api/upload-Product`,
    method: "post",
  },
   deleteProduct: {
    url: `${backendDomain}/api/delete-product`,
    method: "post"
  },
  allProduct: {
    url: `${backendDomain}/api/get-product`,
    method: "get",
  },
  updateProduct: {
    url: `${backendDomain}/api/update-product`,
    method: "post",
  },
  categoryProduct: {
    url: `${backendDomain}/api/get-categoryProduct`,
    method: "get",
  },
  categoryWiseProduct: {
    url: `${backendDomain}/api/category-product`,
    method: "post",
  },
  productDetails: {
    url: `${backendDomain}/api/product-details`,
    method: "post",
  },
  addToCartPrpduct: {
    url: `${backendDomain}/api/addtocart`,
    method: "post",
  },
  AddToCartProductCount: {
    url: `${backendDomain}/api/countAddToCartProduct`,
    method: "get",
  },
  AddToCartProductView: {
    url: `${backendDomain}/api/view-cart-product`,
    method: "get",
  },
  updateCartProduct: {
    url: `${backendDomain}/api/updateCartProduct`,
    method: "post",
  },
  deleteCartProduct: {
    url: `${backendDomain}/api/delete-cart-product`,
    method: "post",
  },
  searchProduc: {
    url: `${backendDomain}/api/search`,
    method: "get",
  },
  filterProduct: {
    url: `${backendDomain}/api/filter-product`,
    method: "post",
  },
   createOrder: {
    url: `${backendDomain}/api/order`,
    method: "post",
  },
    getOrders: {
    url: `${backendDomain}/api/get-orders`,
    method: "get",
  },
   getAllOrders: {
    url: `${backendDomain}/api/get-all-orders`,
    method: "get",
  },
    deleteOrder: {
    url: `${backendDomain}/api/delete-order`,
    method: "post",
  },
};

export default SummaryApi;
