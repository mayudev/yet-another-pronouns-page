import { useContext } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "../lib/context/login";
import "../styles/pages/Landing.scss";

function Landing() {
  const [loginContext] = useContext(LoginContext);
  return (
    <div className="landing">
      <div className="landing__heading">a very simple display for your pronouns</div>
      <div className="landing__subheading">you can login with discord, i suppose</div>
      {loginContext.loggedIn ? (
        <Link to={"/@" + loginContext.username}>
          <button className="button landing__button">Show profile</button>
        </Link>
      ) : (
        <Link to="/login">
          <button className="button landing__button">Sign up</button>
        </Link>
      )}
    </div>
  );
}

export default Landing;
