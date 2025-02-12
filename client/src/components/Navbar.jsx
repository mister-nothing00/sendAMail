import React, { memo, useCallback } from "react";
import { UserData } from "../context/User.Context";

function Navbar() {
  const { logoutUser } = UserData();
  const handleLogout = useCallback(() => {
    logoutUser();
  });
  return (
    <header>
      <div>
        <h1>Example</h1>
      </div>
      <nav>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
        <a href="#" onClick={handleLogout}>
          Logout
        </a>
      </nav>
    </header>
  )
}

export default memo(Navbar);
