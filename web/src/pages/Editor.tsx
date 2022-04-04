import {
  faAddressCard,
  faCircleMinus,
  faTag,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import DeleteAccount from "../components/editor/DeleteAccount";
import PronounsEditor from "../components/editor/PronounsEditor";
import UserSettings from "../components/editor/UserSettings";
import Heading from "../components/Heading";
import InlineButton from "../components/InlineButton";
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

  const onMessage = (message: string) => {
    toast(message);
  };

  if (!current) return <h1>Loading...</h1>;
  return (
    <div className="editor">
      <Link className="editor__link" to={"/@" + loginContext.username}>
        <InlineButton icon={faAddressCard} value="View profile" />
      </Link>
      <Heading icon={faUser} value="Profile"></Heading>
      <UserSettings onMessage={onMessage} />

      <Heading icon={faTag} value="Pronouns"></Heading>
      <PronounsEditor onMessage={onMessage} />

      <Heading icon={faCircleMinus} value="Delete account"></Heading>
      <DeleteAccount />

      <Toaster
        position="top-center"
        toastOptions={{
          className: "toaster",
          iconTheme: {
            primary: "none",
            secondary: "none",
          },
          duration: 1000,
        }}
      />
    </div>
  );
}

export default Editor;
