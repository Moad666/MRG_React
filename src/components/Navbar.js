import React from "react";
import {
  FaLinkedin,
  FaGithub,
  FaFacebook,
  FaWhatsapp,
  FaEnvelope,
  FaSignOutAlt,
} from "react-icons/fa";
import logo from "../images/logo.png";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();

    const logout = () => {
        navigate('/');
        localStorage.removeItem("token");
    }


  return (
    <div>
      <nav className="mb-20 flex items-center justify-between py-6">
        <div className="flex flex-shrink-0 items-center">
          <img src={logo} alt="logo" width={250} height={250} />
        </div>
        <div className="m-8 flex items-center justify-center gap-5 text-2xl text-white">
          <a
            href="https://www.linkedin.com/in/moad-el-otmani-2b5a84294/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/Moad666"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
          </a>
          <a
            href="https://web.facebook.com/profile.php?id=100008624955924"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook />
          </a>
          <a
            href="https://wa.me/0630487121"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp />
          </a>
          <a
            href="mailto:moadelotmani666@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaEnvelope />
          </a>
          <a onClick={logout} className="ml-20 cursor-pointer">
            <FaSignOutAlt />
          </a>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
