import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../lib/context/login";
import "../styles/pages/Login.scss";

function Login() {
  const context = useContext(LoginContext);
  const navigation = useNavigate();

  useEffect(() => {
    // Check if user is logged in and redirect to home page if yes
    if (context.loggedIn) {
      navigation("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context]);

  return (
    <div className="login">
      <div className="login__header">
        <FontAwesomeIcon icon={faUser} size="2x" />
        <span className="header__title">Login</span>
      </div>
      <div className="login__body">
        <a href="/api/login/discord" className="button login__button">
          <FontAwesomeIcon className="button__icon" icon={faDiscord} />
          Login with Discord
        </a>
      </div>
    </div>
  );
}

export default Login;
