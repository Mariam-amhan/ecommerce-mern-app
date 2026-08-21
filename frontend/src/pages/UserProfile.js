import React, { useState } from "react";
import UserIcon from "../assets/signin.gif";
import { useSelector } from "react-redux";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import {useNavigate} from 'react-router-dom'

const UserProfile = () => {
  const navigate = useNavigate()
  const user = useSelector((state) => state?.user?.user);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    // Şifrelerin eşleştiğini kontrol et
    if (data.newPassword !== data.confirmNewPassword) {
      toast.error("Passwords do not match");
      return;
    }

    // Backend'e gönderilecek veri
    const payload = {
      userId: user?._id, // Redux'tan userId alıyoruz
      newPassword: data.newPassword,
    };

    const dataResponse = await fetch(SummaryApi.updatePassword.url, {
      method: SummaryApi.updatePassword.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(payload), // Güncellenmiş payload
    });

    const response = await dataResponse.json();

    if (response.success) {
      toast.success(response.message);
      navigate("/")

    } else {
      toast.error(response.message);
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
          <p>Name: {user?.name}</p>
          <p>Email: {user?.email}</p>
          <p>Role: {user?.role}</p>

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
                  placeholder="Enter Password"
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
                <span className="message">
                  Password must include lowercase, uppercase, symbol, and be at
                  least 8 characters.
                </span>
              )}

              <div className="mt-3">
                <label>Confirm New Password:</label>
                <div className="bg-slate-100 p-2 flex">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Enter password again"
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
              className="bg-red-600 hover:bg-red-700 text-white w-full px-6 py-2 max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-4"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;