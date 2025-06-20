import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL;

const Dashboard = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  //logout handler
  const handleLogout = async () => {
    try {
      await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      setUser(null); // clear auth state
      toast.success("Logout Successful!");
      navigate("/login");
    } catch (err) {
      toast.error("Could not log out. Try again.");
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Welcome, {user.username} 👋</h1>
      <p>Email: {user.email}</p>

      <button onClick={() => navigate("/dashboard/profile")}>
        Go to Profile
      </button>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
