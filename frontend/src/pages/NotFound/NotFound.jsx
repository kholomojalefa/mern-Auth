import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="notfound-container">
      <h1>🚫 404</h1>
      <p>Sorry, the page you're looking for doesn't exist.</p>
      <p className="emoji">🛠️</p>
      <Link to="/login" className="back-button">
        ⬅ Return to Login
      </Link>
    </div>
  );
};

export default NotFound;
