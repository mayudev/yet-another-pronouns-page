import { useEffect } from "react";
import { useParams } from "react-router-dom";

type Params = {
  name: string;
};
function Profile() {
  let params = useParams<Params>();

  useEffect(() => {
    async function fetchData() {
      const resp = await fetch("/api/user/" + params.name);
      const mayu = await resp.text();
      alert(mayu);
    }
    fetchData();
  }, []);

  return <h1>Profile {params.name}</h1>;
}

export default Profile;
