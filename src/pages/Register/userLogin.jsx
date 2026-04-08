import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useRef, useState } from "react";
import { auth } from "../../firebase/firebase.init";
import { Link, useNavigate } from "react-router";

const UserLogin = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const ref = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    setError("");
    setSuccess(false);
    setLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        if (!result.user.emailVerified) {
          setError("Please verify your email first.");
          return;
        }
        console.log(result);
        setSuccess(true);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleResetPass = () => {
    if (!emailValue) {
      setError("Enter a valid mail.");
      return;
    }
    const email = ref.current.value;
    sendPasswordResetEmail(auth, email).then(() => {
      alert("password sent");
    });
  };

  return (
    <div
      className="absolute w-full h-screen z-20 flex 
    justify-center items-center bg-white/20 backdrop-blur-3xl top-0 left-0"
    >
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col w-full max-w-sm">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Log In</h1>
          </div>
          <div className="card bg-base-100 w-full shrink-0 shadow-2xl">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <fieldset className="flex flex-col gap-2">
                  <label className="label">Email</label>
                  <input
                    ref={ref}
                    type="email"
                    name="email"
                    value={emailValue}
                    onChange={(e) => setEmailValue(e.target.value)}
                    className="input"
                    placeholder="Email"
                    required
                  />
                  <div className="relative">
                    <label className="label">Password</label>
                    <input
                      type={showPass ? "text" : "password"}
                      name="password"
                      className="input"
                      placeholder="Password"
                      required
                    />
                    <div
                      onClick={() => setShowPass(!showPass)}
                      className=" pl-2 pr-1 absolute top-[50%]  right-1 cursor-pointer bg-white flex justify-center items-center"
                    >
                      <img
                        className="w-5"
                        src={
                          showPass ? "/images/eye-off.png" : "/images/eye.png"
                        }
                        alt="eye"
                      />
                    </div>
                  </div>

                  <div>
                    <a onClick={handleResetPass} className="link link-hover">
                      Forgot password?
                    </a>
                  </div>
                  <button type="submit" className="btn btn-neutral">
                    Log In{" "}
                    {loading && (
                      <span className="loading loading-spinner loading-sm"></span>
                    )}
                  </button>
                </fieldset>
              </form>

              <div>
                <div>
                  {error && <p className="text-red-500 text-center">{error}</p>}
                  {success && (
                    <p className="text-green-600 text-center">
                      Log In Successfull.
                    </p>
                  )}
                </div>
                <p className="text-center">
                  New here?{" "}
                  <Link className="link" to="/register">
                    Register
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
