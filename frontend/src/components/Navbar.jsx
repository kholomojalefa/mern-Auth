// components/Navbar.jsx
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const { user } = useAuth();

  return (
    <nav aria-label="Main Navigation">
      <Link to="/">Home</Link>
      {user?.role === "admin" && <Link to="/admin">Admin Panel</Link>}
      {user && <Link to="/dashboard">Dashboard</Link>}
      {!user && <Link to="/login">Login</Link>}
    </nav>
  );
};

export default Navbar;
