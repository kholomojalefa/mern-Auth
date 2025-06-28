import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Forgot from "./pages/Auth/ForgotPassword";
import Reset from "./pages/Auth/ResetPassword";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import AdminPanel from "./pages/AdminPanel";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<Forgot />} />
      <Route path="/reset-password/:token" element={<Reset />} />

      {/* Protected User Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminPanel />
          </AdminRoute>
        }
      />

      {/* Catch-All 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
