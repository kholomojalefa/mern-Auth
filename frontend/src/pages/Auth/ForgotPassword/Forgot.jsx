import { useState } from "react";
import API from "../../../utils/api";
import toast from "react-hot-toast";
import "./forgot.css";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/forgot-password", { email });
      setSubmitted(true);
      toast.success("Reset link sent to your email!");
    } catch (err) {
      toast.error("Error sending reset link");
      console.error(err);
    }
  };

  return (
    <div className="forgot-container">
      <h2>Forgot Password</h2>
      {submitted ? (
        <p>Check your email for a reset link.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Send Reset Link</button>
        </form>
      )}
    </div>
  );
};

export default Forgot;
