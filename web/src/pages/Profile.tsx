import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserData } from "../lib/interfaces";
import NotFound from "./NotFound";
import "../styles/pages/Profile.scss";
import Header from "../components/profile/Header";
import Heading from "../components/Heading";
import { faPencil, faTag } from "@fortawesome/free-solid-svg-icons";
import Pronouns from "../components/profile/Pronouns";
import { LoginContext } from "../lib/context/login";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Params = {
  name: string;
};
function Profile() {
  const [current, setCurrent] = useState<UserData>();
  const [error, setError] = useState(0);
  const loginContext = useContext(LoginContext);

  let params = useParams<Params>();

  useEffect(() => {
    async function fetchData() {
      // Try to fetch user data
      try {
        const resp = await fetch("/api/v1/user/" + params.name);

        if (!resp.ok) {
          throw new Error(resp.statusText);
        }

        const data = (await resp.json()) as UserData;
        setCurrent(data);
      } catch (e) {
        if (e instanceof Error) {
          if (e.message === "Not Found") {
            // Show 404 page
            setError(404);
          }
        }
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Page not found
  if (error === 404) {
    return <NotFound />;
  }

  // Display data
  if (current) {
    return (
      <div className="profile">
        {current.id === loginContext.id ? (
          <Link to="/editor" className="profile__edit">
            <FontAwesomeIcon icon={faPencil} />
            <span className="edit__text">Edit profile</span>
          </Link>
        ) : (
          ""
        )}
        <Header username={current.username} avatar={current.avatar} />
        <div className="profile__bio">{current.bio}</div>
        <Heading icon={faTag} value="Pronouns" />
        <Pronouns pronouns={current.pronouns} />
      </div>
    );
  }

  // Page is loading
  return <div></div>;
}

export default Profile;
