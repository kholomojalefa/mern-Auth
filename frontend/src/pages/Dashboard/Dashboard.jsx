import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import "./Dashboard.css";

const API_URL = import.meta.env.VITE_API_URL;

const Dashboard = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch(`${API_URL}/auth/logout`, {
        method: "GET",
        credentials: "include",
      });
      setUser(null);
      toast.success("You’ve been logged out!");
      navigate("/login");
    } catch {
      toast.error("Logout failed, please try again.");
    }
  };

  return (
    <div className="dashboard-container">
      <h1>
        👋 Welcome back, <span className="highlight">{user.username}</span>
      </h1>

      <div className="user-info">
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Role:</strong>{" "}
          <span className={`role-badge ${user.role}`}>{user.role}</span>
        </p>
      </div>

      <div className="dashboard-actions">
        {user.role === "admin" && (
          <button onClick={() => navigate("/admin")}>🛠 Admin Panel</button>
        )}
        <button onClick={() => navigate("/dashboard/profile")}>
          👤 Profile
        </button>
        <button onClick={handleLogout}>🚪 Logout</button>
      </div>
    </div>
  );
};

export default Dashboard;
