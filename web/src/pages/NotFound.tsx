import "../styles/pages/NotFound.scss";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="error">
      <div className="error__text">Page not found!</div>
      <button className="button error__button" onClick={() => navigate(-1)}>
        Return to previous page
      </button>
    </div>
  );
}

export default NotFound;
