import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <Link className="mr-2" to="/">
        Home
      </Link>
      <Link className="mr-2" to="/login">
        Login
      </Link>
      <Link className="mr-2" to="/register">
        Register
      </Link>
    </div>
  );
};

export default Header;
