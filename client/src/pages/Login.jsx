import React, { memo, useCallback, useState } from "react";
import "./style.pages.css";
import { UserData } from "../context/User.Context";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState(" ");
  const [password, setPassword] = useState(" ");

  const {loginUser } = UserData();
  const navigate = useNavigate();

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    await loginUser(email, password);
    navigate("/");
  });

  return (
    <div className="container-form">
      <div>
        <h1>Login form </h1>
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

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type={"password"}
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="">
            Submit
          </button>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ fontSize: "14px" }}>
            Have you forgotten your password? <a href="/reset-password">Reset</a>
          </label>
          <label style={{ fontSize: "14px" }}>
            Don't have an account ? <a href="/register">Register</a>
          </label>
        </div>
      </form>
    </div>
  );
}

export default memo(Login);
