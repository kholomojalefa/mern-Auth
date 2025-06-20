import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="notfound-container">
      <h1>404</h1>
      <p>Oops! The page you're looking for doesn't exist.</p>
      <p className="emoji">🚧</p>
      <Link to="/login" className="back-button">
        ⬅ Go back to Login
      </Link>
    </div>
  );
};

export default NotFound;
