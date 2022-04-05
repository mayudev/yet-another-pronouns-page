import {
  faAddressCard,
  faCircleUser,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "../lib/context/login";

import "../styles/components/UserButton.scss";
import InlineButton from "./InlineButton";

function UserButton() {
  const [loginContext] = useContext(LoginContext);

  return (
    <>
      <span className="navigation__entry navigation__entry--with_dropdown navigation__entry--primary">
        <FontAwesomeIcon icon={faCircleUser} />
        <span className="entry__title">{loginContext.username}</span>
        <div className="dropdown">
          <Link className="dropdown__entry" to={"/@" + loginContext.username}>
            <InlineButton icon={faUser} value="Show profile"></InlineButton>
          </Link>
          <Link className="dropdown__entry" to="/editor">
            <InlineButton icon={faAddressCard} value="Edit profile"></InlineButton>
          </Link>
          <a className="dropdown__entry" href="/api/login/logout">
            <InlineButton icon={faRightFromBracket} value="Log out"></InlineButton>
          </a>
        </div>
      </span>
    </>
  );
}

export default UserButton;
