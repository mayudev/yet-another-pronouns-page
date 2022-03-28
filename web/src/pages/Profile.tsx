import { useParams } from "react-router-dom";

type Params = {
  name: string;
};
function Profile() {
  let params = useParams<Params>();

  return <h1>Profile {params.name}</h1>;
}

export default Profile;
