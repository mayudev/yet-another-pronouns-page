import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "../styles/components/Navigation.scss";
import { useContext } from "react";
import { LoginContext } from "../lib/context/login";
import UserButton from "./UserButton";

function Navigation() {
  const [context] = useContext(LoginContext);

  const loginButton = (
    <Link className="navigation__entry navigation__entry--primary" to="login">
      <FontAwesomeIcon icon={faCircleUser} />
      <span className="entry__title">Login</span>
    </Link>
  );

  return (
    <nav className="navigation">
      <Link to="/" className="navigation__entry navigation__entry--link">
        <span className="entry__title">yet another pronouns page</span>
      </Link>
      <span style={{ flex: 1 }} />
      {context.loggedIn ? <UserButton /> : loginButton}
    </nav>
  );
}

export default Navigation;
