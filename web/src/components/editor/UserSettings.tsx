import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";
import { LoginContext } from "../../lib/context/login";
import { UserData } from "../../lib/interfaces";

function UserSettings() {
  const loginContext = useContext(LoginContext);
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [usernameStatus, setUsernameStatus] = useState("");

  const usernameRegex = /^[a-zA-Z0-9_]+$/;

  useEffect(() => {
    // Load current values from context
    if (loginContext.loggedIn && loginContext.initalized) {
      setUsername(loginContext.username);
      setBio(loginContext.bio);
    }
  }, [loginContext]);

  // Username validation
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (username === loginContext.username) return setUsernameStatus("");

      // Verify length
      if (username.length <= 1) return setUsernameStatus("Username too short");
      if (username.length > 32) return setUsernameStatus("Username too long");

      // Regexp match
      if (!usernameRegex.test(username)) return setUsernameStatus("Incorrect username");

      // Availability check
      fetch("/api/v1/check/" + username)
        .then((resp) => {
          if (!resp.ok) {
            if (resp.status === 409) return setUsernameStatus("Username taken");
            else throw new Error(resp.statusText);
          }

          // Fine
          return setUsernameStatus("");
        })
        .catch((e) => {
          return setUsernameStatus("Internal server error");
        });
    }, 500);
    return () => clearTimeout(timeout);
  }, [username]);

  const submit = async () => {
    let body: Partial<{
      username: string;
      bio: string;
    }> = {};

    if (username !== loginContext.username) body.username = username;
    if (bio !== loginContext.bio) body.bio = bio;

    if (Object.entries(body).length === 0) return;

    try {
      const resp = await fetch("/api/v1/me", {
        method: "POST",

        body: JSON.stringify(body),

        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      if (!resp.ok) {
        throw new Error(resp.statusText);
      }

      const data = (await resp.json()) as UserData;

      setUsername(data.username);
      setBio(data.bio);

      // heresy
      loginContext.username = data.username;
      loginContext.bio = data.bio;
    } catch (e) {}
  };

  return (
    <section className="editor__section">
      <section className="section__setting section__setting--inline">
        <div className="setting__header">Username</div>
        <div className="setting__edit">
          <input
            className="setting__input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
      </section>
      <section className="section__setting">
        <div className="setting__header">Bio</div>
        <div className="setting__edit">
          <ReactTextareaAutosize
            className="setting__input"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            minRows={3}
            maxRows={10}
          />
        </div>
      </section>
      <section className="section__setting section__setting--inline">
        <button
          disabled={
            usernameStatus.length > 0 ||
            (username === loginContext.username && bio === loginContext.bio)
          }
          onClick={submit}
          className="button"
        >
          Save
        </button>
        {usernameStatus.length > 0 && (
          <div className="setting__status">
            <FontAwesomeIcon icon={faExclamationTriangle} />
            <span className="status__text">{usernameStatus}</span>
          </div>
        )}
      </section>
    </section>
  );
}

export default UserSettings;
