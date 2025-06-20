import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../utils/api"; // use axios if not using this
import "./Login.css";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser } = useAuth(); //access context

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/login", form, {
        withCredentials: true, //cookies
      });

      //Fetch and set the user
      const res = await API.get("/auth/me", {
        withCredentials: true,
      });
      setUser(res.data);

      toast.success("Login Successful!");
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
      toast.error("Login Failed!");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="login-form">
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
        <button type="submit">Login</button>
        <button onClick={() => navigate("/register")}>Register</button>
      </form>
    </div>
  );
};

export default Login;
