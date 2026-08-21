import React, { useState } from "react";
import UserIcon from "../assets/signin.gif";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SummaryApi from "../common/index";
import { FcGoogle } from "react-icons/fc";


const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showVerificationInput, setShowVerificationInput] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isEmailTaken, setIsEmailTaken] = useState(false); 
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePic: "",
  });

  

  const handleOnChange = async (e) => {
    const { name, value } = e.target;
    setData((preve) => ({
      ...preve,
      [name]: value,
    }));

    // Şifre kontrolü
    if (name === "password") {
      const hasLowercase = /[a-z]/.test(value);
      const hasUppercase = /[A-Z]/.test(value);
      const hasSymbol = /[!@#$%^&*()_+\-={};':"\\|,.<>/?]/.test(value);
      const isLongEnough = value.length >= 8;
      setIsPasswordValid(hasLowercase && hasUppercase && hasSymbol && isLongEnough);
    }

    // Email kontrolü
    if (name === "email" && value) {
      const emailExists = await checkEmailExists(value);
      setIsEmailTaken(emailExists);

    }


  };
    const checkEmailExists = async (email) => {

      const response = await fetch(SummaryApi.ChekEmail.url, {
        method: SummaryApi.ChekEmail.method, 
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const result = await response.json();
      return result.exists; 
  };

  

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    // Şifre eşleşme kontrolü
    if (data.password === data.confirmPassword) {
      setLoading(true);
      const dataResponse = await fetch(SummaryApi.signUp.url, {
        method: SummaryApi.signUp.method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const response = await dataResponse.json();

      if (response.success) {
        toast.success(response.message);
        setUserEmail(data.email);
        setShowVerificationInput(true);
      }

      if (response.error) {
        toast.warning(response.message);
      }
      setLoading(false);
    } else {
      toast.warning("Passwords don't match, please check again");
    }
    
  };

  const handleVerification = async () => {
    const dataResponse = await fetch(SummaryApi.verifyEmail.url, {
      method: SummaryApi.verifyEmail.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email: userEmail, code: verificationCode }),
    });

    const response = await dataResponse.json();

    if (response.success) {
      toast.success(response.message);
      navigate("/");
    }

    if (response.error) {
      toast.warning(response.message);
    }
  };


  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8080/api/auth/google";
  };



  return (
    <section id="signup">
      <div className="container mx-auto p-4">
        <div className="bg-white p-4 w-full max-w-md mx-auto rounded">
          <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full">
            <img src={UserIcon} alt="gif" className="object-scale-down mix-blend-multiply" />
            <form>
              <label>
                <div className="text-xs bg-opacity-80 cursor-pointer bg-slate-100 py-4 text-center absolute bottom-0 w-full">
                  Upload Photo
                </div>
                <input type="file" className="hidden" />
              </label>
            </form>
          </div>

          <form className="pt-6 flex flex-col gap-3" onSubmit={handleOnSubmit}>
            <div className="grid">
              <label>Full Name:</label>
              <div className="bg-slate-100 p-2">
                <input
                  type="text"
                  name="name"
                  placeholder="Enter Your Name"
                  className="w-full h-full outline-none bg-transparent"
                  required
                  value={data.name}
                  onChange={handleOnChange}
                />
              </div>
            </div>

            <div className="grid">
              <label>Email:</label>
              <div className={` ${isEmailTaken ? "invalid" : "bg-slate-100 p-2"}`}>
                <input
                  type="text"
                  name="email"
                  placeholder="Enter Your Email"
                  className="w-full h-full outline-none bg-transparent"
                  required
                  value={data.email}
                  onChange={handleOnChange}
                />
                {isEmailTaken && (
                  <span className="message">
                  This User Already Exists, please use a different email.
                </span>
                )}
              </div>
            </div>

            <div>
              <label>Password:</label>
              <div className={`bg-slate-100 p-2 flex ${!isPasswordValid && data.password.length > 0 ? "invalid" : ""}`}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  className="w-full h-full outline-none bg-transparent"
                  name="password"
                  value={data.password}
                  onChange={handleOnChange}
                  required
                />
                <div className="cursor-pointer" onClick={() => setShowPassword((preve) => !preve)}>
                  <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
              {!isPasswordValid && data.password.length > 0 && (
                <span className="message">
                  Password must include lowercase, uppercase, symbol, and be at least 8 characters.
                </span>
              )}

              <div className="mt-3">
                <label>Confirm Password:</label>
                <div className="bg-slate-100 p-2 flex">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Enter password again"
                    className="w-full h-full outline-none bg-transparent"
                    name="confirmPassword"
                    value={data.confirmPassword}
                    onChange={handleOnChange}
                    required
                  />
                  <div className="cursor-pointer" onClick={() => setShowConfirmPassword((preve) => !preve)}>
                    <span>{showConfirmPassword ? <FaEyeSlash /> : <FaEye />}</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white w-full px-6 py-2 max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-4"
              disabled={loading || !isPasswordValid || isEmailTaken}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>

            {showVerificationInput && (
              <div className="mt-4 flex items-center gap-3">
                <label className="text-red-600">*Enter Code:</label>
                <div className="bg-red-100 p-2 flex flex-col gap-2 rounded-md">
                  <input
                    type="text"
                    placeholder="Enter Verification Code"
                    className="w-full h-full outline-none bg-transparent"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                  />
                </div>
                <button
                  type="button" // Formu tekrar tetiklememesi için
                  onClick={handleVerification}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 max-w-[150px] rounded-md mx-auto"
                >
                  Verify
                </button>
              </div>
            )}
          </form>

         <div className="flex flex-col mt-3 items-center">
                  <button
                      className=" border-2 border-slate-400 rounded-md h-10 px-6  flex justify-center items-center hover:scale-105 transition-all "
                      onClick={handleGoogleLogin}
                    >
                      <FcGoogle className=" hover:scale-105 text-2xl" /> <span className=" ml-2">Sign in with Google</span>
                    </button>
                    <p className=" my-4">
                      Already have account?
                        <Link
                          className=" hover:underline hover:text-red-600 ml-2"
                          to={"/login"}
                        >
                          Sign in
                        </Link>
                      </p>
           
                  </div>

         
        </div>
      </div>
    </section>
  );
};

export default SignUp;