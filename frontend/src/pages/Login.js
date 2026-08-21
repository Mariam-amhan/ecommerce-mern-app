import React, { useContext, useState } from "react";
import UserIcon from "../assets/signin.gif";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import Context from "../context";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [showPasswrod, setShowPassword] = useState(false);
  
  const { fetchUserDetails } = useContext(Context);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => ({
      ...preve,
      [name]: value,
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const dataResponse = await fetch(SummaryApi.userLogin.url, {
      method: SummaryApi.userLogin.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const response = await dataResponse.json();

    if (response.success) {
      toast.success(response.message);
      fetchUserDetails();
    }

    if (response.error) {
      toast.error(response.message);
      console.log(response.error);
    }
  };
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8080/api/auth/google";
  };
  return (
  
    <section id="login">
      {/** mean div start */}
      <div className=" container mx-auto p-4">
        <div className=" bg-white p-4 w-full max-w-md mx-auto rounded">
          {/** user profile section start */}

          <div className=" w-20 h-20 mx-auto relative overflow-hidden rounded-full">
            <img
              src={UserIcon}
              alt="gif"
              className=" object-scale-down mix-blend-multiply"
            />
          </div>
          {/** user profile section end */}

          {/** signup form section start */}

          <form className=" pt-6 flex flex-col gap-3" onSubmit={handleOnSubmit}>
            <div className=" grid">
              <label>Email :</label>
              <div className=" bg-slate-100 p-2">
                <input
                  type="text"
                  name="email"
                  placeholder="Enter Your Email"
                  className=" w-full h-full outline-none bg-transparent"
                  required
                  value={data.email}
                  onChange={handleOnChange}
                />
              </div>
            </div>

            <div className=" grid">
              <label>Password :</label>
              <div className=" bg-slate-100 p-2 flex items-center">
                <input
                  type={showPasswrod ? "text" : "password"}
                  name="password"
                  placeholder="Enter Your Password"
                  className=" w-full h-full outline-none bg-transparent"
                  required
                  value={data.password}
                  onChange={handleOnChange}
                />
                <div
                  className=" cursor-pointer"
                  onClick={() => setShowPassword((preve) => !preve)}
                >
                  <span>{showPasswrod ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
            </div>

            <Link to={"/forgot-password"} className=" hover:underline hover:text-red-600">Forgot Your Password ?</Link>

            <button
              type="submit"
              className=" bg-red-600 hover:bg-red-700 text-white w-full px-6 py-2 max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-4"
            >
              Login
            </button>
          </form>
          <div className="flex flex-col mt-3 items-center">
          <button
              className=" border-2 border-slate-400 rounded-md h-10 px-6  flex justify-center items-center hover:scale-105 transition-all "
              onClick={handleGoogleLogin}
            >
              <FcGoogle className=" hover:scale-105 text-2xl" /> <span className=" ml-2">Sign in with Google</span>
            </button>
            <p className=" my-4">
              Dont have account ?
              <Link
                className=" hover:underline hover:text-red-600 ml-2"
                to={"/sign-up"}
              >
                SignUp
              </Link>
            </p>
   
          </div>
        </div>

        {/** signup form section end */}
      </div>
      {/** mean div end */}
    </section>
    //signup section end
  );
};

export default Login;
