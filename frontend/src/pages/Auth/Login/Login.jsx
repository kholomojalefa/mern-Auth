import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../../utils/api";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import "./Login.css";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const googleButtonRef = useRef(null);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleGoogleLogin = async (response) => {
    const token = response.credential;
    try {
      await API.post("/auth/google", { token }, { withCredentials: true });
      const userRes = await API.get("/auth/me", { withCredentials: true });
      setUser(userRes.data);
      toast.success("Logged in with Google!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Google Auth Error:", err);
      toast.error("Google login failed");
    }
  };

  useEffect(() => {
    if (window.google && googleButtonRef.current) {
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: handleGoogleLogin,
      });
      window.google.accounts.id.renderButton(googleButtonRef.current, {
        theme: "outline",
        size: "large",
        type: "standard",
      });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await API.post("/auth/login", form, { withCredentials: true });
      const res = await API.get("/auth/me", { withCredentials: true });
      setUser(res.data);
      toast.success("Login Successful!");
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
      toast.error("Login Failed!");
    } finally {
      setLoading(false);
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
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <button type="button" onClick={() => navigate("/forgot-password")}>
          Forgot Password?
        </button>

        <div ref={googleButtonRef} className="google-login-btn" />

        <button
          onClick={() => navigate("/register")}
          type="button"
          className="secondary"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Login;
