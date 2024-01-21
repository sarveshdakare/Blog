import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

const Nav = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  };

  return (
    <div>
    
      {auth ? (
        <ul className="nav">
        <h1>Blog App</h1>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/add">Add Blog</Link>
          </li>
          <li>
            <Link to="/update">Update Blog</Link>
          </li>
          <li>
            <Link to="/signup" onClick={logout}>
              Logout ({JSON.parse(auth).name})
            </Link>{" "}
          </li>
        </ul>
      ) : (
        <ul className="nav">
          <li>
            {" "}
            <Link to="/signup">Sign Up</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Nav;
