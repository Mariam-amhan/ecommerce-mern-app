import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"; // URL’den token almak için
import UserIcon from "../assets/signin.gif";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const navigate = useNavigate()
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [searchParams] = useSearchParams(); // URL parametrelerini al
  const token = searchParams.get("token"); // URL’den token’ı çek
  const [data, setData] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    // Şifrelerin eşleştiğini kontrol et
    if (data.newPassword !== data.confirmNewPassword) {
      toast.error("Passwords don't match, please check again");
      return;
    }

    // Backend’e gönderilecek veri (token ile birlikte)
    const payload = {
      token: token, // URL’den alınan token
      newPassword: data.newPassword,
    };

    try {
      const dataResponse = await fetch(SummaryApi.resetPassword.url, {
        method: SummaryApi.resetPassword.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const response = await dataResponse.json();

      if (response.success) {
        toast.success(response.message); 
        navigate("/")
      } else {
        toast.error(response.message); 
      }
    } catch (error) {
      toast.error("error");
      console.error("Hata:", error);
    }
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => ({
      ...preve,
      [name]: value,
    }));

    if (name === "newPassword") {
      const hasLowercase = /[a-z]/.test(value);
      const hasUppercase = /[A-Z]/.test(value);
      const hasSymbol = /[!@#$%^&*()_+\-={};':"\\|,.<>/?]/.test(value);
      const isLongEnough = value.length >= 8;
      setIsPasswordValid(hasLowercase && hasUppercase && hasSymbol && isLongEnough);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white p-4 w-full max-w-md mx-auto">
        <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full">
          <img
            src={UserIcon}
            alt="gif"
            className="object-scale-down mix-blend-multiply"
          />
        </div>

        <div className="grid mt-5">
          <form className="flex flex-col gap-3 pt-6" onSubmit={handleOnSubmit}>
            <div>
              <label>New Password:</label>
              <div
                className={`bg-slate-100 p-2 flex ${
                  !isPasswordValid && data.newPassword.length > 0 ? "invalid" : ""
                }`}
              >
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="enter new password"
                  className="w-full h-full outline-none bg-transparent"
                  name="newPassword"
                  value={data.newPassword}
                  onChange={handleOnChange}
                  required
                />
                <div
                  className="cursor-pointer"
                  onClick={() => setShowPassword((preve) => !preve)}
                >
                  <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
              {!isPasswordValid && data.newPassword.length > 0 && (
                <span className="message text-red-500 text-sm">
                Password must include lowercase, uppercase, symbol, and be at least 8 characters.
                </span>
              )}

              <div className="mt-3">
                <label>Confirm New Password:</label>
                <div className="bg-slate-100 p-2 flex">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="enter your new password again"
                    className="w-full h-full outline-none bg-transparent"
                    name="confirmNewPassword"
                    value={data.confirmNewPassword}
                    onChange={handleOnChange}
                    required
                  />
                  <div
                    className="cursor-pointer"
                    onClick={() => setShowConfirmPassword((preve) => !preve)}
                  >
                    <span>{showConfirmPassword ? <FaEyeSlash /> : <FaEye />}</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white w-full px-6 py-2 max-w-[180px] rounded-full hover:scale-110 transition-all mx-auto block mt-4"
            >
              Reset password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;