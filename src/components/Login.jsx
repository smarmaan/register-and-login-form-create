import React, { useRef, useState } from "react";

import {
  GithubAuthProvider,
  GoogleAuthProvider,
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { app } from "../firebase.init";
import { Link } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [passwordType, setPasswordType] = useState("password");

  const emailRef = useRef();

  const auth = getAuth(app);

  const authProviderGoogle = new GoogleAuthProvider();

  const authProviderGitHub = new GithubAuthProvider();

  const handleGoogleLogin = () => {
    signInWithPopup(auth, authProviderGoogle)
      .then((result) => {
        const loggedUser = result.user;

        setUser(loggedUser);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleLogOut = () => {
    signOut(auth)
      .then((result) => {
        console.log(result);
        setUser(null);
      })
      .catch((error) => console.error(error));
  };

  const handleGitHubLogin = () => {
    signInWithPopup(auth, authProviderGitHub)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        setUser(loggedUser);
      })
      .catch((error) => console.error(error));
  };
  console.log(user);

  const handleEmailLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    console.log(email, password);

    setError("");
    setSuccess("");

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

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const loggedUser = result.user;
        // setUser(loggedUser);
        setSuccess(`User logged in successfully`);
        setError("");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleResetPass = (e) => {
    const email = emailRef.current.value;
    console.log(email);

    if (!email) {
      alert(`Please provide a valid email`);
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert(`please check your email`);
      })
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
      <form onSubmit={handleEmailLogin} className="text-left block">
        {/* 


 */}
        <label htmlFor="email">Email address: </label>
        <div>
          <input
            type="email"
            name="email"
            id="email"
            required
            ref={emailRef}
            placeholder="Enter your email"
            className="input input-bordered input-info w-full max-w-xs my-2 text-black block"
          />
        </div>
        {/* 


 */}
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
            className="w-6 h-6 absolute top-[8px] right-[60px] translate-y-1/2  cursor-pointer"
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
            New to this website..!! please <Link to="/register">Register</Link>{" "}
          </p>
        </div>
        {/* <input type="submit" value="Register" /> */}{" "}
        <button className="btn btn-primary my-2">
          <input type="submit" value="Login" />
        </button>
      </form>

      {/* 


 */}

      <p className="mb-7">
        Forget password..?? Please{" "}
        <button className="rounded-full" onClick={handleResetPass}>
          Reset{" "}
        </button>{" "}
        password
      </p>

      {/* 




 */}

      {user && (
        <div>
          <h2>Name: {user?.displayName}</h2>
          <h3>
            Mail: {(user?.email && user?.email) || ` this mail already exists`}
          </h3>

          {user?.emailVerified && <h3>Verified: Yes... </h3>}

          <img src={user?.photoURL} alt="" />
          <h3>User ID: {user?.uid}</h3>
        </div>
      )}

      {/* 

out of topic... 

*/}

      {(user && <button onClick={handleLogOut}> LogOut</button>) || (
        <div className="flex justify-center gap-4">
          <button onClick={handleGoogleLogin}>
            {" "}
            <img className="w-5" src="../../public/search.png" alt="" />
          </button>
          <button onClick={handleGitHubLogin}>
            <img
              className="w-5 bg-white rounded-lg"
              src="../../public/github.png"
              alt=""
            />
          </button>
        </div>
      )}

      {/* {(user && (
        <button onClick={handleLogOut}> LogOut</button>
      )) || } */}
    </div>
  );
};

export default Login;
