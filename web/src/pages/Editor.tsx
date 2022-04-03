import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../lib/context/login";
import { UserData } from "../lib/interfaces";

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
    <div>
      {current.username} - {current.id}
    </div>
  );
}

export default Editor;
