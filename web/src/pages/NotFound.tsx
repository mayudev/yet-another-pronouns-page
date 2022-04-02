import "../styles/pages/NotFound.scss";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="error">
      <div className="error__header">
        <FontAwesomeIcon icon={faExclamationTriangle} size="2x" />
        <span className="header__title">Page not found</span>
      </div>
      <button className="button error__button" onClick={() => navigate(-1)}>
        <FontAwesomeIcon className="button__icon" icon={faArrowLeft} />
        Return to previous page
      </button>
    </div>
  );
}

export default NotFound;
