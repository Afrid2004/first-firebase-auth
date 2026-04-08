import {
  FacebookAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase/firebase.init";
import { useNavigate } from "react-router";

const Login = () => {
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(null);
  const provider = new GoogleAuthProvider();
  const gitHubProvider = new GithubAuthProvider();
  const facebookProvider = new FacebookAuthProvider();
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    setErr(null);
    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user);
      })
      .catch((error) => {
        setErr(error.message);
      });
  };

  const handleGitHubSignIn = () => {
    setErr(null);
    signInWithPopup(auth, gitHubProvider)
      .then((result) => {
        const loggedUser = result.user;
        // fallback email fix
        if (!loggedUser.email && loggedUser.providerData.length > 0) {
          if (loggedUser.providerData[0].email) {
            loggedUser.email = loggedUser.providerData[0].email;
          } else {
            loggedUser.email = loggedUser.providerData[0].uid;
          }
        }
        setUser(loggedUser);
        console.log(loggedUser);
      })
      .catch((error) => {
        setErr(error.message);
      });
  };

  const handleFacebookSignIn = () => {
    setErr(null);
    signInWithPopup(auth, facebookProvider)
      .then((result) => {
        const loggedUser = result.user;
        // fallback email fix
        if (!loggedUser.email && loggedUser.providerData.length > 0) {
          if (loggedUser.providerData[0].email) {
            loggedUser.email = loggedUser.providerData[0].email;
          } else {
            loggedUser.email = loggedUser.providerData[0].uid;
          }
        }
        setUser(loggedUser);
        console.log(loggedUser);
      })
      .catch((error) => {
        setErr(error.message);
      });
  };

  const handleEmail = () => {
    navigate("/user/login", { replace: true });
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("Signed Out");
        setUser(null);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="relative">
      <div className="container">
        <div className="flex justify-center items-center h-[calc(100vh-7rem)]">
          <div className="flex items-center justify-center flex-col gap-2">
            {!user && (
              <>
                <button
                  onClick={handleGoogleSignIn}
                  className="bg-gray-800 min-w-95 w-full hover:bg-gray-950 text-white flex items-center gap-2 px-4 py-3 rounded-4xl cursor-pointer justify-center"
                >
                  <span>Sign In with Google </span>
                  <img src="/images/google.png" alt="google" className="w-5" />
                </button>
                <button
                  onClick={handleGitHubSignIn}
                  className="border-2 border-gray-800 bg-white hover:bg-gray-200 min-w-95 w-full flex items-center gap-2 px-4 py-3 rounded-4xl cursor-pointer justify-center"
                >
                  <span>Sign In with GitHub </span>
                  <img src="/images/github.webp" alt="google" className="w-6" />
                </button>
                <button
                  onClick={handleFacebookSignIn}
                  className="border-2 hover:bg-gray-200 border-blue-500 text-blue-500 min-w-95 w-full flex items-center gap-2 px-4 py-3 rounded-4xl cursor-pointer justify-center"
                >
                  <span>Sign In with Facebook </span>
                  <img
                    src="/images/facebook.avif"
                    alt="google"
                    className="w-6"
                  />
                </button>
                <button
                  onClick={handleEmail}
                  className="border-2 hover:bg-gray-200 border-gray-900 text-gray-900 min-w-95 w-full flex items-center gap-2 px-4 py-3 rounded-4xl cursor-pointer justify-center"
                >
                  <span>Continue With Email </span>
                  <img src="/images/email.png" alt="email" className="w-6" />
                </button>
              </>
            )}
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
            {err && <p className="text-red-500">{err}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
