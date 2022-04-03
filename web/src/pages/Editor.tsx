import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserSettings from "../components/editor/UserSettings";
import Heading from "../components/Heading";
import { LoginContext } from "../lib/context/login";
import { UserData } from "../lib/interfaces";

import "../styles/pages/Editor.scss";

function Editor() {
  const [current, setCurrent] = useState<UserData>();

  const navigate = useNavigate();
  const loginContext = useContext(LoginContext);

  useEffect(() => {
    // Allow only users that are logged in
    if (!loginContext.loggedIn && loginContext.initalized) {
      navigate("/");
    }

    setCurrent(loginContext);
  }, [loginContext]);

  if (!current) return <h1>Loading...</h1>;
  return (
    <div className="editor">
      <Heading icon={faUser} value="Profile"></Heading>
      <UserSettings />
      <div className="editor__pane"></div>
      <div className="editor__pane"></div>
    </div>
  );
}

export default Editor;
