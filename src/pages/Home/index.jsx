import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import { auth } from "../../firebase/firebase.init";
import { AuthContext } from "../../context/authContext/authContext";
import { useNavigate } from "react-router";

const Home = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  console.log(user);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("Signed Out");
        navigate("/login", { replace: true });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <div className="container">
      <div>
        <h1> Home</h1>
      </div>
      {user && (
        <div className="flex gap-2 items-center bg-gray-100 p-4 border border-gray-300/60 rounded-xl">
          <div className="user-image shrink-0">
            <img
              className="w-12 rounded-full"
              src={user.photoURL}
              alt={user.displayName}
            />
          </div>
          <div className="user-info">
            <h4>{user.displayName}</h4>
            <p className="text-gray-500">{user.email}</p>
          </div>
          <div className="user-sign-out shrink-0">
            <button
              onClick={handleSignOut}
              className="px-3 py-2 border border-gray-300 rounded-xl text-red-500 cursor-pointer hover:bg-gray-200 hover:border-gray-300"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
