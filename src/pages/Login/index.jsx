import {
  FacebookAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  updateEmail,
} from "firebase/auth";
import React, { useContext, useState } from "react";
import { auth } from "../../firebase/firebase.init";
import { useNavigate } from "react-router";
import { AuthContext } from "../../context/authContext/authContext";

const Login = () => {
  const [err, setErr] = useState(null);
  const provider = new GoogleAuthProvider();
  const gitHubProvider = new GithubAuthProvider();
  const facebookProvider = new FacebookAuthProvider();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleGoogleSignIn = () => {
    setErr(null);
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result.user);
        navigate("/", { replace: true });
      })
      .catch((error) => {
        setErr(error.message);
      });
  };

  const handleGitHubSignIn = () => {
    setErr(null);
    signInWithPopup(auth, gitHubProvider)
      .then((result) => {
        navigate("/", { replace: true });
      })
      .catch((error) => {
        setErr(error.message);
      });
  };

  const handleFacebookSignIn = () => {
    setErr(null);
    signInWithPopup(auth, facebookProvider)
      .then((result) => {
        navigate("/", { replace: true });
      })
      .catch((error) => {
        setErr(error.message);
      });
  };

  const handleEmail = () => {
    navigate("/user/login", { replace: true });
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
            {err && <p className="text-red-500">{err}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
