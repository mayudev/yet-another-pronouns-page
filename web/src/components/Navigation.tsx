import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "../styles/components/Navigation.scss";
import SearchBar from "./controls/SearchBar";
import { useContext, useState } from "react";
import { LoginContext } from "../lib/loginContext";

function Navigation() {
  const [searchQuery, setSearchQuery] = useState("");
  const context = useContext(LoginContext);

  const loginButton = (
    <Link
      className="navigation__entry navigation__entry--link navigation__entry--primary"
      to="login"
    >
      <FontAwesomeIcon icon={faCircleUser} />
      <span className="entry__title">Login</span>
    </Link>
  );

  const logoutButton = (
    <a
      href="/api/discord/logout"
      className="navigation__entry navigation__entry--link navigation__entry--primary"
    >
      <FontAwesomeIcon icon={faCircleUser} />
      <span className="entry__title">Log out</span>
    </a>
  );

  return (
    <nav className="navigation">
      <span className="navigation__entry">yet another pronouns page</span>
      <Link className="navigation__entry navigation__entry--link" to="/">
        <FontAwesomeIcon icon={faCircleInfo} />
        <span className="entry__title">About</span>
      </Link>
      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Look for a user..."
      />
      {context.loggedIn ? logoutButton : loginButton}
    </nav>
  );
}

export default Navigation;
