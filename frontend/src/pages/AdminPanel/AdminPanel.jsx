import { useEffect, useState, useCallback } from "react";
import API from "../../utils/api";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import "./AdminPanel.css";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  const fetchUsers = useCallback(async () => {
    try {
      const res = await API.get("/admin/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users", err);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    try {
      const res = await API.patch(`/admin/users/${userId}/role`, {
        role: newRole,
      });
      toast.success(res.data.message);
      fetchUsers(); // Refresh the list
    } catch (err) {
      console.error("Failed to update user role", err);
      toast.error("Failed to update role");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const renderUsersTable = () => {
    if (loading) {
      return <p>Loading users...</p>;
    }

    const filteredUsers = users.filter((u) => u._id !== user?.id);

    if (filteredUsers.length === 0) {
      return <p>No users available.</p>;
    }

    return (
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
          {filteredUsers.map((u) => (
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
    );
  };

  return (
    <div className="admin-container">
      <h2>User Management Panel</h2>
      {renderUsersTable()}
      <button className="back-btn" onClick={() => navigate("/dashboard")}>
        ⬅ Back to Dashboard
      </button>
    </div>
  );
};

export default AdminPanel;
