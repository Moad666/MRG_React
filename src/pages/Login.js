import React, { useState } from "react";
import axios from "axios";
import logo from "../images/logon.png";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import immg from '../images/immg.png';



function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);

    const goToSignupPage = () => {
        navigate("/signup")
    }

  const login = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8080/api/auth/public/signin",
        {
          username: username,
          password: password,
        }
      );
      localStorage.setItem("token", response.data.jwtToken);
      console.log("Success !");
      console.log("username : ", response.data.username);
      console.log("token : ", response.data.jwtToken);

      toast.success("Welcome " + response.data.username);
      setLoginSuccess(true);
    } catch (e) {
      console.log(e);
      setError("Login Failed");
      toast.error("User not found");
    }
  };

  return (
    <div className=" min-h-screen flex items-center justify-center">
      <div className="absolute inset-0 -z-10 h-full w-full [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
      <ToastContainer/>
      {/* Container */}
      <div className="container mx-auto">
        <div className="flex justify-center px-6 my-12">
          {/* Row */}
          <div className="w-full xl:w-3/4 lg:w-11/12 flex">
            {/* Left Column - Image */}
            <div
              className="w-full h-auto hidden lg:block lg:w-1/2 bg-cover rounded-l-lg"
              style={{
                backgroundImage:
                  `url(${immg})`,
                backgroundPosition: '-100px'
                }}
            ></div>
            {/* Right Column - Form */}
            <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
              <div className="flex justify-center">
                <img src={logo} width={300} height={300} alt="Logo" />
              </div>
              <h3 className="pt-4 text-2xl text-center font-myanmar">Welcome Back!</h3>
              <form
                onSubmit={login}
                className="px-8 pt-6 pb-8 mb-4 bg-white rounded"
              >
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700 font-myanmar"
                    htmlFor="username"
                  >
                    Username
                  </label>
                  <input
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    placeholder="Username"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700 font-myanmar"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <input
                    className="mr-2 leading-tight"
                    type="checkbox"
                    id="checkbox_id"
                  />
                  <label className="text-sm font-myanmar" htmlFor="checkbox_id">
                    Remember Me
                  </label>
                </div>
                <div className="mb-6 text-center">
                  <button
                    className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Login
                  </button>
                </div>
                <hr className="mb-6 border-t" />
                <button
                    className="w-full px-4 py-2 font-bold text-white bg-blue-700 rounded-full hover:bg-blue-500 focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={goToSignupPage}

                  >
                    Create Account
                  </button>
                <div className="text-center">
                  <a
                    className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800 mt-4"
                    href="#"
                  >
                    Forgot Password?
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
