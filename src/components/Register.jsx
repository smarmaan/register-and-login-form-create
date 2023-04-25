import React, { useState } from "react";

import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { app } from "../firebase.init";
import { Link } from "react-router-dom";

const auth = getAuth(app);

const Register = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [passwordType, setPasswordType] = useState("password");

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    const email = e.target.email.value;
    const password = e.target.password.value;
    const name = e.target.name.value;

    console.log(name, email, password);

    if (!/(?=.*[A-Z])/.test(password)) {
      setError(`Please add at least one Uppercase letter`);
      return;
    } else if (!/(?=.*[0-9].*[0-9])/.test(password)) {
      setError(`Please add at least  two Number letter`);
      return;
    } else if (password.length < 6) {
      setError(`Please add at least six character...`);
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const createdUser = result.user;
        console.log(createdUser);
        setError("");
        e.target.reset();
        setSuccess(`User has been created successfully`);
        sendVerificationMail(createdUser);

        updateUserData(createdUser, name);
      })
      .catch((error) => {
        console.error(error.message);
        setError(error.message);
        setSuccess("");
      });
  };

  const sendVerificationMail = (user) => {
    sendEmailVerification(user)
      .then((result) => {
        alert(`please verify your email`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateUserData = (user, name) => {
    updateProfile(user, {
      displayName: name,
    })
      .then(() => console.log(`User name updated successfully`))
      .catch((error) => {
        console.error(error);
        setError(error.message);
      });
  };

  const togglePassword = () => {
    setPasswordType(passwordType === "password" ? "text" : "password");
  };

  return (
    <div>
      <h2 className="my-5"> Please Register</h2>

      <form onSubmit={handleSubmit} className="text-left block">
        <label htmlFor="email">User Name: </label>
        <input
          type="text"
          name="name"
          id="name"
          required
          placeholder="Enter your User Name"
          className="input input-bordered input-info w-full max-w-xs my-2 text-black block"
        />
        <label htmlFor="email">Email address: </label>
        <input
          type="email"
          name="email"
          id="email"
          required
          placeholder="Enter your email"
          className="input input-bordered input-info w-full max-w-xs my-2 text-black block"
        />
        <label htmlFor="password">Password:</label>
        <div className="flex relative">
          <input
            type={passwordType}
            name="password"
            id="password"
            required
            placeholder="Enter your password"
            className="input pr-7 input-bordered input-info w-full max-w-xs my-2 text-black block"
          />
          <img
            src="../../public/pass.png"
            alt=""
            className="w-6 h-6 absolute top-[8px] right-[10px] translate-y-1/2  cursor-pointer"
            onClick={togglePassword}
          />
        </div>
        <div className="text-center">
          <p className="text-red-600"> {error} </p>
        </div>
        <div className="text-center">
          <p className="text-green-500"> {success} </p>
        </div>
        <div className="text-center">
          <p className="">
            Already have an account..!! please <Link to="/login">Login</Link>{" "}
          </p>
        </div>
        {/* <input type="submit" value="Register" /> */}{" "}
        <button className="btn btn-primary my-2">
          <input type="submit" value="Register" />
        </button>
      </form>
    </div>
  );
};

export default Register;
