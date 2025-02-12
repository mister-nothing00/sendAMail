import { memo } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserData } from "./context/User.Context";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ResetPassword from "./pages/ResetPassword";
import NewPassword from "./pages/NewPassword";

function App() {
  const { isAuth } = UserData();
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={isAuth ? <Home /> : <Login />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/reset-password/:token" element={<NewPassword/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default memo(App);
