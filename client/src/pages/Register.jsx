import React, { memo, useCallback, useState } from "react";
import "./style.pages.css";
import { UserData } from "../context/User.Context";
import { useNavigate } from "react-router-dom";
function Register() {
  const [username, setUsername] = useState(" ");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(" ");

  const {registerUser } = UserData();
  const navigate = useNavigate();

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    await registerUser(username, email, password);
    navigate("/login");
  });

  return (
    <>
      <div className="container-form">
        <div>
          <h1>Register Form </h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="username">Name</label>
            <input
              id="username"
              type="text"
              placeholder="Your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <label htmlFor="password">Password</label>
            <input
              id="password"
              type={"password"}
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button  type="submit" className="">
              Submit
            </button>
          </div>
          <label style={{ color: "gray" }}>
            Do you have an account ? <a href="/login">Login</a>
          </label>
        </form>
      </div>
    </>
  );
}

export default memo(Register);
