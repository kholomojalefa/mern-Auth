import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="profile-container">
      <h2>👤 Profile</h2>
      <p>
        <strong>Username:</strong> {user.username}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <button onClick={() => navigate("/dashboard")}>Back</button>
    </div>
  );
};

export default Profile;
