import { useEffect } from "react";
import { useParams } from "react-router-dom";

type Params = {
  name: string;
};
function Profile() {
  let params = useParams<Params>();

  useEffect(() => {
    async function fetchData() {
      const resp = await fetch("/api/v1/user/" + params.name);
      const mayu = await resp.text();
      alert(mayu);
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <h1>Profile {params.name}</h1>;
}

export default Profile;
