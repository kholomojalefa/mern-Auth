import { useEffect, useState } from "react";
import API from "../../utils/api";
import toast from "react-hot-toast";
import "./AdminPanel.css";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const res = await API.get("/admin/users", { withCredentials: true });
      setUsers(res.data);
    } catch (err) {
      toast.error("Failed to load users");
      console.error(err);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      const res = await API.patch(
        `/admin/users/${userId}/role`,
        { role: newRole },
        { withCredentials: true }
      );

      toast.success(res.data.message);
      fetchUsers(); // Refresh list
    } catch (err) {
      toast.error("Failed to update role");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="admin-container">
      <h2>User Management Panel</h2>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Username</th>
            <th>Role</th>
            <th>Update Role</th>
          </tr>
        </thead>
        <tbody>
          {user &&
            users
              .filter((u) => u._id !== user.id) // filter out current user
              .map((u) => (
                <tr key={u._id}>
                  <td>{u.email}</td>
                  <td>{u.username}</td>
                  <td>{u.role}</td>
                  <td>
                    <select
                      value={u.role}
                      onChange={(e) => handleRoleChange(u._id, e.target.value)}
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>

      <button onClick={() => navigate("/dashboard")}>Back</button>
    </div>
  );
};

export default Admin;
