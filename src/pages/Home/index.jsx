import React, { useContext } from "react";
import { AuthContext } from "../../context/authContext/authContext";

const Home = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="container">
      <div className="py-5">
        <div>
          {user ? (
            <h1 className="text-3xl font-medium mb-4">
              {" "}
              Hello {user.displayName.split(" ")[0]}, Welcome
            </h1>
          ) : (
            <h1 className="text-3xl font-medium mb-4">Home Articles</h1>
          )}
        </div>
        {user && (
          <div className="flex gap-2 items-center bg-gray-100 p-4 border border-gray-300/60 rounded-xl w-full max-w-sm ">
            <div className="user-image shrink-0">
              <img
                className="w-12 rounded-full"
                src={user.photoURL}
                alt={user.displayName}
              />
            </div>
            <div className="user-info">
              <h4>{user.displayName}</h4>
              <p className="text-gray-500 line-clamp-1">{user.email}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
