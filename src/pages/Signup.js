import React, { useState, useEffect } from "react";
import logo from '../images/logon.png';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import immg from '../images/immg.png';

function Signup(){

    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [registrationSuccess, setRegistrationSuccess] = useState(false);

    const goToLoginPage = () => {
        navigate('/');
    }

    const Signup = async(e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            console.log('password not match');
            toast.error("Password not match");
            return;
          }
        try{
            const response = await axios.post("http://127.0.0.1:8080/api/auth/public/signup", {
                username : username,
                email : email,
                password : password
            });
            console.log('Register Success');
            toast.success("Register was successfully");
            setRegistrationSuccess(true);
        }catch(e){
            console.log(e);
            toast.error("Username/Email already taken");
            setError("Registration failed. Please try again");
        }
        
    }
    useEffect(() => {
      if (registrationSuccess) {
        const timer = setTimeout(() => {
          navigate("/");
        }, 1500);
  
        return () => clearTimeout(timer); // Cleanup the timer
      }
    }, [registrationSuccess, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="absolute inset-0 -z-10 h-full w-full [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
          <ToastContainer />
          {/* Container */}
          <div className="container mx-auto">
            <div className="flex justify-center my-12">
              {/* Row */}
              <div className="w-full xl:w-3/4 lg:w-11/12 flex">
                {/* Left Column - Image */}
                <div
                  className=" w-full h-auto hidden lg:block lg:w-1/2 bg-cover rounded-l-lg"
                  style={{
                    backgroundImage:
                      `url(${immg})`,
                    backgroundPosition: '-130px'
                    }}
                ></div>
                {/* Right Column - Form */}
                <div className=" w-full lg:w-1/2 bg-white rounded-lg lg:rounded-l-none">
                  <div className="flex justify-center">
                    <img src={logo} width={300} height={300} alt="Logo" />
                  </div>
                  <h3 className="text-2xl text-center font-myanmar">SignUp</h3>
                  <form
                    onSubmit={Signup}
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
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="block mb-2 text-sm font-bold text-gray-700 font-myanmar"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <input
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="email"
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="block mb-2 text-sm font-bold text-gray-700 font-myanmar"
                        htmlFor="confirmPassword"
                      >
                        Confirm Password
                      </label>
                      <input
                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        
                      />
                    </div>
                    <div className="mb-6 text-center">
                      <button
                        className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                        type="submit"
                      >
                        Signup
                      </button>
                    </div>
                    <hr className="mb-6 border-t" />
                    <button
                        className="w-full px-4 py-2 font-bold text-white bg-blue-700 rounded-full hover:bg-blue-500 focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={goToLoginPage}
                        
    
                      >
                        Login
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

export default Signup;