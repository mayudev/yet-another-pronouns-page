import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../lib/context/login";

type Props = {
  onMessage(message: string): void;
};

function DeleteAccount({ onMessage }: Props) {
  const [sure, setSure] = useState(false);
  const [loginContext, setLoginContext] = useContext(LoginContext);
  const navigate = useNavigate();

  const proceed = () => {
    setSure(true);
  };

  const cancel = () => {
    setSure(false);
  };

  const deleteAccount = async () => {
    try {
      const resp = await fetch("/api/v1/me", {
        method: "DELETE",
      });

      if (!resp.ok) {
        if (resp.status === 401) {
          onMessage("Session has expired.");
        } else if (resp.status === 500) {
          onMessage("Internal server error.");
        } else {
          onMessage("Something went wrong.");
        }
        throw new Error(resp.statusText);
      }

      onMessage("Account deleted!");

      setTimeout(() => {
        // Reset context
        setLoginContext({
          ...loginContext,
          loggedIn: false,
          id: "",
          username: "",
          pronouns: [],
          avatar: "",
          bio: "",
          initalized: true,
        });

        // Redirect to home page
        navigate("/");
      }, 1000);
    } catch (e) {}
  };

  return (
    <div className="editor__section">
      <div className="delete__text">If you want, you can delete your account.</div>
      {sure ? (
        <>
          <div className="delete__text">
            Are you sure you want to delete your account? There's no going back.
          </div>
          <button className="button button--long button--grouped" onClick={cancel}>
            Cancel
          </button>
          <button className="button button--long button--grouped" onClick={deleteAccount}>
            Confirm
          </button>
        </>
      ) : (
        <button className="button button--long" onClick={proceed}>
          Delete
        </button>
      )}
    </div>
  );
}

export default DeleteAccount;
