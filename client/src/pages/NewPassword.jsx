import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserData } from "../context/User.Context";
import toast from "react-hot-toast";

export default function NewPassword() {
  const { token } = useParams();
  const { loading, setLoading, updatePassword } = UserData(); // Aggiunto setLoading
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (token === undefined) return;

    if (!token) {
      toast.error("Token mancante.");
      navigate("/login");
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      return toast.error("Le password non corrispondono.");
    }

    try {
      setLoading(true);
      await updatePassword(newPassword, token);
      toast.success("Password aggiornata con successo!");
      setTimeout(() => navigate("/"), 1000);
    } catch (error) {
      toast.error("Errore nell'aggiornamento della password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="reset-password">
      <h1>Reset your password</h1>
      <p>
        Sunt sunt consectetur veniam eu non adipisicing nisi. Incididunt aliqua
        anim anim commodo incididunt laboris enim. Et nulla veniam cillum ex est
        culpa.
      </p>
      <div className="container-reset-password">
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button type="submit">
            {loading ? "Update Password" : "Updating..."}
          </button>
        </form>
      </div>
    </div>
  );
}
