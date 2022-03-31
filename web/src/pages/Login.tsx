import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../lib/loginContext";
import "../styles/pages/Login.scss";

function Login() {
  const context = useContext(LoginContext);
  const navigation = useNavigate();

  useEffect(() => {
    // Check if user is logged in and redirect to home page if yes
    if (context.loggedIn) {
      navigation("/");
    }
  }, []);

  return (
    <div className="login">
      <h1>Login</h1>
      <div className="login__buttons">
        <a href="/api/discord/login" className="button login__button">
          Login with Discord
        </a>
      </div>
    </div>
  );
}

export default Login;
