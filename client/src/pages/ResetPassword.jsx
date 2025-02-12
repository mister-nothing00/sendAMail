import React, { memo, useCallback, useState } from "react";
import "./style.pages.css";
import { UserData } from "../context/User.Context";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function ResetPassword() {
  const { user, resetPasswordRequest, loading } = UserData();
  const navigate = useNavigate();
  const [email, setEmail] = useState(user?.email || "");
 

  const handleSendEmail = useCallback(
    (e) => {
      e.preventDefault();

      if (!email) {
        toast.error("Inserisci un'email valida.");
        return;
      }

      resetPasswordRequest(email);
    },
    [email, resetPasswordRequest]
  );

  return (
    <div id="reset-password">
      <FaArrowLeft size={24} onClick={() => navigate(-1)} />
      <div className="container-reset">
        <h1>Dear, {user?.username || "Guest"}</h1>
        <p style={{ width: "50%", textAlign: "center" }}>
          Quis sunt occaecat Lorem commodo esse non laborum Lorem nisi sint
          aliqua nostrud culpa. Eiusmod occaecat ipsum sunt occaecat in dolore
          Lorem deserunt irure do sunt. Reprehenderit tempor elit ut non ut eu
          nostrud deserunt. Ullamco voluptate velit enim eu.
        </p>

        <form onSubmit={handleSendEmail}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Inserisci la tua email"
            disabled={!!user}
          />
          <button
            style={{ marginLeft: "4px" }}
            type="submit"
           
          >
            {loading ? "Loading..." : "Invia email"}
          </button>
        </form>

        <label style={{ color: "gray" }}>
          Do you have an account? <a href="/login">Login</a>
        </label>
      </div>
    </div>
  );
}

export default memo(ResetPassword);