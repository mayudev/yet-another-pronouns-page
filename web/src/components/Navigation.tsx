import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "../styles/components/Navigation.scss";
import SearchBar from "./controls/SearchBar";
import { useState } from "react";

function Navigation() {
  const [searchQuery, setSearchQuery] = useState("");

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
      <Link
        className="navigation__entry navigation__entry--link navigation__entry--primary"
        to="login"
      >
        <FontAwesomeIcon icon={faCircleUser} />
        <span className="entry__title">Login</span>
      </Link>
    </nav>
  );
}

export default Navigation;
