import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../../utils/api";
import "./Login.css";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const googleButtonRef = useRef(null);

  // Google Login handler
  const handleGoogleLogin = async (response) => {
    const token = response.credential;

    try {
      await API.post("/auth/google", { token }, { withCredentials: true });

      // Get authenticated user
      const userRes = await API.get("/auth/me", {
        withCredentials: true,
      });

      setUser(userRes.data);
      toast.success("Logged in with Google!");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Google login failed");
      console.error("Google Auth Error:", error);
    }
  };

  // Google Button Render
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

  // Email/Password login
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/login", form, {
        withCredentials: true,
      });

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

        <button type="button" onClick={() => navigate("/forgot-password")}>
          Forgot Password?
        </button>

        <div ref={googleButtonRef} className="google-login-btn" />

        <button onClick={() => navigate("/register")} type="button">
          Register
        </button>
      </form>
    </div>
  );
};

export default Login;
