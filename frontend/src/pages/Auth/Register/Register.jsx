import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../../utils/api";
import toast from "react-hot-toast";
import "./Register.css";

const Register = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await API.post("/auth/register", form);
      toast.success("Registration Successful!");
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
      toast.error("Registration Failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="register-form">
        <input
          name="username"
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Register"}
        </button>
      </form>
      <button onClick={() => navigate("/login")}>Cancel</button>
    </div>
  );
};

export default Register;
