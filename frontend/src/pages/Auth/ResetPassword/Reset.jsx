import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../../utils/api";
import toast from "react-hot-toast";
import "./reset.css";

const Reset = () => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirm) {
      return toast.error("Passwords do not match");
    }

    try {
      setLoading(true);
      await API.patch(`/auth/reset-password/${token}`, { password });
      toast.success("Password reset successful!");
      navigate("/login");
    } catch (err) {
      toast.error("Reset failed. Try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-container">
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm new password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default Reset;
