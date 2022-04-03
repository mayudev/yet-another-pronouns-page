import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserData } from "../lib/interfaces";
import NotFound from "./NotFound";
import "../styles/pages/Profile.scss";
import Header from "../components/profile/Header";
import Heading from "../components/Heading";
import { faTag } from "@fortawesome/free-solid-svg-icons";
import Pronouns from "../components/profile/Pronouns";

type Params = {
  name: string;
};
function Profile() {
  const [current, setCurrent] = useState<UserData>();
  const [error, setError] = useState(0);
  const navigate = useNavigate();

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

        console.log(e);
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
        <Header username={current.username} avatar={current.avatar} />
        <div className="profile__bio">{current.bio}</div>
        <Heading icon={faTag} value="Pronouns" />
        <Pronouns pronouns={current.pronouns} />
      </div>
    );
  }

  // Page is loading
  return <h1>Loadifdjhasdfifsduh</h1>;
}

export default Profile;
