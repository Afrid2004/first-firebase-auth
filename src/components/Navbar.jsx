import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router";
import { AuthContext } from "../context/authContext/authContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase.init";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/login", { replace: true });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <div className="border-b bg-white border-gray-200 py-2">
      <div className="container">
        <div className="flex items-center justify-between">
          <div className="left-logo">
            <NavLink to="/">
              <div className="flex items-center">
                <img src="/images/logo.png" alt="logo" className="w-10" />
                <h4 className="text-2xl font-medium text-gray-700">
                  Firebase Auth
                </h4>
              </div>
            </NavLink>
          </div>
          <div className="right-menu">
            <ul className="flex items-center gap-5">
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/about">About</NavLink>
              </li>
              <li>
                {user ? (
                  <button
                    onClick={() => handleSignOut()}
                    className="bg-gray-700 cursor-pointer hover:bg-gray-800 duration-75 text-white px-4 py-2 rounded-4xl"
                  >
                    Sign Out
                  </button>
                ) : (
                  <NavLink
                    to="/login"
                    className="bg-orange-500 hover:bg-orange-600 duration-75 text-white px-4 py-2 rounded-4xl"
                  >
                    Sign In
                  </NavLink>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
