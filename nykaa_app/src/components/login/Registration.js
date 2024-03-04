import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const LoginRegisterPage = () => {
  const [email, setEmail] = useState("");
  const [isEmailRegistered, setIsEmailRegistered] = useState(false);
  const [showRegistrationFields, setShowRegistrationFields] = useState(false);
  const [otp, setOTP] = useState("");
  const [enteredOTP, setEnteredOTP] = useState("");
  const [otpVerificationStatus, setOTPVerificationStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    mobile: "",
  });

  const [emailError, setEmailError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [userId, setUserId] = useState(null);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "username") {
      setUsernameError("");
    } else if (name === "mobile") {
      setMobileError("");
    }
  };

  const handleOTPChange = (e) => {
    setEnteredOTP(e.target.value);
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      return false;
    }
    return true;
  };

  const validateUsername = () => {
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!usernameRegex.test(formData.username)) {
      setUsernameError(
        "Username can only contain letters, numbers, and underscores."
      );
      return false;
    }
    return true;
  };

  const validateMobile = () => {
    const mobileRegex = /^\d{10}$/;
    if (!mobileRegex.test(formData.mobile)) {
      setMobileError("Please enter a 10-digit mobile number.");
      return false;
    }
    return true;
  };

  const checkEmailRegistered = async () => {
    if (validateEmail()) {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/users/checkEmail",
          { email }
        );
        const { isRegistered } = response.data;
        setIsEmailRegistered(isRegistered);

        console.log(
          `Email ${email} is${
            isRegistered ? "" : " not"
          } registered in the database.`
        );

        setOTPVerificationStatus("");

        if (isRegistered) {
          const otpResponse = await axios.post(
            "http://localhost:8080/api/users/sendOtp",
            null,
            {
              params: { email },
            }
          );

          const generatedOtp = otpResponse.data.otp;
          console.log("Generated OTP:", generatedOtp);

          setOTP(generatedOtp);
          setShowRegistrationFields(false);
          setOTPVerificationStatus("");
        } else {
          setShowRegistrationFields(true);
          setOTPVerificationStatus("");
        }
      } catch (error) {
        console.error(
          "Error checking email registration:",
          error.response ? error.response.data : error.message
        );
      }
    }
  };

  const registerUser = async () => {
    const isUsernameValid = validateUsername();
    const isMobileValid = validateMobile();

    if (isUsernameValid && isMobileValid) {
      try {
        const response = await axios.post("http://localhost:8080/api/users", {
          ...formData,
          email,
          otp,

          cart: {},
        });
        const userId = response.data.id;

        setUserId(userId);

        alert("User registered successfully!");
        alert("User registered successfully! User ID: " + userId);
        console.log(otp);
      } catch (error) {
        console.error(
          "Error Registering User:",
          error.response ? error.response.data : error.message
        );
      }
    }
  };

  const handleLogin = async () => {
    if (enteredOTP === otp) {
      setOTPVerificationStatus("");

      try {
        const response = await axios.get(`http://localhost:8080/api/users`);
        const users = response.data;

        const loggedInUser = users.find((user) => user.email === email);

        if (loggedInUser) {
          console.log("UserId:", loggedInUser.id);
          console.log(
            "CartId:",
            loggedInUser.cart ? loggedInUser.cart.id : "No Cart"
          );

          sessionStorage.setItem("userId", loggedInUser.id);
          sessionStorage.setItem("username", loggedInUser.username);
          sessionStorage.setItem(
            "cartId",
            loggedInUser.cart ? loggedInUser.cart.id : null
          );
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
            window.location.reload();
            navigate("/");
          }, 100);
        } else {
          console.error("User not found for the given email:", email);
        }
      } catch (error) {
        console.error(
          "Error fetching user details:",
          error.response ? error.response.data : error.message
        );
      }
    } else {
      setOTPVerificationStatus("Wrong OTP. Please try again.");
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <div className="max-w-md mx-auto bg-white p-8 border rounded shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-pink-600">
          Register for Nykaa
        </h2>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-gray-600"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className={`w-full p-2 border-b-2 border-pink-500 focus:outline-none ${
              emailError ? "border-red-500" : ""
            }`}
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
          />
          {emailError && (
            <p className="text-sm text-red-500 mt-2">{emailError}</p>
          )}
        </div>

        <button
          className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600"
          onClick={checkEmailRegistered}
        >
          Proceed
        </button>

        {showRegistrationFields && (
          <>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-semibold text-gray-600"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className={`w-full p-2 border-b-2 border-pink-500 focus:outline-none ${
                  usernameError ? "border-red-500" : ""
                }`}
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleInputChange}
              />
              {usernameError && (
                <p className="text-sm text-red-500 mt-2">{usernameError}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="mobile"
                className="block text-sm font-semibold text-gray-600"
              >
                Mobile Number
              </label>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                className={`w-full p-2 border-b-2 border-pink-500 focus:outline-none ${
                  mobileError ? "border-red-500" : ""
                }`}
                placeholder="Enter your mobile number"
                value={formData.mobile}
                onChange={handleInputChange}
              />
              {mobileError && (
                <p className="text-sm text-red-500 mt-2">{mobileError}</p>
              )}
            </div>
            <button
              className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600"
              onClick={registerUser}
            >
              Register
            </button>
          </>
        )}

        {isEmailRegistered && !showRegistrationFields && (
          <>
            <div className="mb-4">
              <label
                htmlFor="otp"
                className="block text-sm font-semibold text-gray-600"
              >
                Enter OTP
              </label>
              <input
                type="text"
                id="otp"
                name="otp"
                className="w-full p-2 border-b-2 border-pink-500 focus:outline-none"
                placeholder="Enter OTP"
                onChange={handleOTPChange}
              />
            </div>
            {otpVerificationStatus && (
              <p className="text-sm text-gray-600 mt-2">
                {otpVerificationStatus}
              </p>
            )}
            {enteredOTP === otp && (
              <Link to={"/"}>
                <button
                  className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600"
                  onClick={handleLogin}
                  disabled={otpVerificationStatus !== ""}
                >
                  Login
                </button>
              </Link>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default LoginRegisterPage;
