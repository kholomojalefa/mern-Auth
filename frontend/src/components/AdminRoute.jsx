import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Spinner from "./Spinner";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <Spinner />;
  if (!user || user.role !== "admin") return <Navigate to="/dashboard" />;

  return children;
};

export default AdminRoute;
