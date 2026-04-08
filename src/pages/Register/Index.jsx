import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import React, { useContext, useState } from "react";
import { auth } from "../../firebase/firebase.init";
import { Link } from "react-router";
import { AuthContext } from "../../context/authContext/authContext";

const Register = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{6,}$/;

  const { createUser } = useContext(AuthContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const name = event.target.name.value;
    const termsAndCondition = event.target.terms.checked;
    if (!passPattern.test(password)) {
      setSuccess(false);
      setError(
        "Password must Contain upper and lower case letter, special charecter and digit",
      );
      return;
    }
    if (!emailPattern.test(email)) {
      setSuccess(false);
      setError("Please enter a valid email address");
      return;
    }

    if (!termsAndCondition) {
      setSuccess(false);
      setError("Please accepet our Terms and Conditions");
      return;
    }

    setError("");
    setSuccess(false);
    setLoading(true);

    createUser(email, password)
      .then((result) => {
        console.log(result.user);
        setSuccess(true);
        updateProfile(result.user, { displayName: name });
        event.target.reset();
        sendEmailVerification(result.user)
          .then(() => {
            alert("A verification mail has been sent to your mail.");
          })
          .catch((error) => {
            console.log(error.message);
          });
      })
      .catch((error) => {
        console.log(error.message);
        if (error.code === "auth/email-already-in-use") {
          setError("Email already exists. Please try another one.");
        } else if (error.code === "auth/weak-password") {
          setError("Password should be at least 6 characters.");
        } else if (error.code === "auth/invalid-email") {
          console.log("email", email);
          setError("Email is invalid. Please Enter a valid Email.");
        } else {
          setError("Sorry! Something went wrong.");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  //disabled for state manegement using contextApi
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const email = event.target.email.value;
  //   const password = event.target.password.value;
  //   const termsAndCondition = event.target.terms.checked;
  //   if (!passPattern.test(password)) {
  //     setSuccess(false);
  //     setError(
  //       "Password must Contain upper and lower case letter, special charecter and digit",
  //     );
  //     return;
  //   }
  //   if (!emailPattern.test(email)) {
  //     setSuccess(false);
  //     setError("Please enter a valid email address");
  //     return;
  //   }

  //   if (!termsAndCondition) {
  //     setSuccess(false);
  //     setError("Please accepet our Terms and Conditions");
  //     return;
  //   }

  //   setError("");
  //   setSuccess(false);
  //   setLoading(true);
  //   createUserWithEmailAndPassword(auth, email, password)
  //     .then((result) => {
  //       console.log(result.user);
  //       setSuccess(true);
  //       event.target.reset();
  //       sendEmailVerification(result.user)
  //         .then((result) => {
  //           alert("A verification mail has been sent to your mail.");
  //         })
  //         .catch((error) => {
  //           console.log(error.message);
  //         });
  //     })
  //     .catch((error) => {
  //       console.log(error.message);
  //       if (error.code === "auth/email-already-in-use") {
  //         setError("Email already exists. Please try another one.");
  //       } else if (error.code === "auth/weak-password") {
  //         setError("Password should be at least 6 characters.");
  //       } else if (error.code === "auth/invalid-email") {
  //         setError("Email is invalid. Please Enter a valid Email.");
  //       } else {
  //         setError("Sorry! Something went wrong.");
  //       }
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // };

  return (
    <div
      className="absolute w-full h-screen z-20 flex 
    justify-center items-center bg-white/20 backdrop-blur-3xl top-0 left-0"
    >
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col w-full max-w-sm">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Register</h1>
          </div>
          <div className="card bg-base-100 w-full shrink-0 shadow-2xl">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <fieldset className="flex flex-col gap-2">
                  <label className="label">Name</label>
                  <input
                    type="text"
                    name="name"
                    className="input"
                    placeholder="Name"
                    required
                  />
                  <label className="label">Email</label>
                  <input
                    type="email"
                    name="email"
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
                    <label className="label">
                      <input
                        type="checkbox"
                        name="terms"
                        className="checkbox checkbox-sm"
                      />
                      Accept Terms & Condition
                    </label>
                  </div>
                  <div>
                    <a className="link link-hover">Forgot password?</a>
                  </div>
                  <button type="submit" className="btn btn-neutral">
                    Register{" "}
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
                      Account Created Successfully!
                    </p>
                  )}
                </div>
                <p className="text-center">
                  Already have an account?{" "}
                  <Link className="link" to="/user/login">
                    Log In
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

export default Register;
