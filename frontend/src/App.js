import "./App.css";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SummaryApi from "./common/index";
import { useEffect, useState } from "react";
import Context from "./context/index";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "./store/userSlice";

function App() {
  const [cartProductCount, setCartProductCount] = useState(0);
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const fetchUserDetails = async () => {
    const dataResponse = await fetch(SummaryApi.currentUser.url, {
      method: SummaryApi.currentUser.method,
      credentials: "include",
    });
    const dataApi = await dataResponse.json();
    if (dataApi.success) {
      dispatch(setUserDetails(dataApi.data));
    }
  };
  const fetchUserAddToCart = async () => {
    const dataResponse = await fetch(SummaryApi.AddToCartProductCount.url, {
      method: SummaryApi.AddToCartProductCount.method,
      credentials: "include",
    });
    const dataApi = await dataResponse.json();
    setCartProductCount(dataApi?.data?.count);
  };
  useEffect(() => {
    fetchUserDetails();
    fetchUserAddToCart();
  }, []);
  useEffect(() => {
    if (user?._id) {
      fetchUserAddToCart();
    } else {
      setCartProductCount(0);
    }
  }, [user?._id]);
  useEffect(() => {
    if (user) {
      if (user?.password === "") {
        navigate("/user-profile");
        toast.success(
          `Welcome ${user?.name} Please set a password to ensure the security of your account.`,
        );
      } else {
        navigate("/");
      }
    }
  }, [user, navigate]);
  return (
    <>
      <Context.Provider
        value={{ fetchUserDetails, cartProductCount, fetchUserAddToCart }}
      >
        <ToastContainer position="top-center" />
        <Header />
        <main className=" min-h-[calc(100vh-120px)] pt-16">
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;
