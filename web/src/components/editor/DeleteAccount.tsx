import { useState } from "react";

function DeleteAccount() {
  const [sure, setSure] = useState(false);

  const proceed = () => {
    setSure(true);
  };

  const cancel = () => {
    setSure(false);
  };

  const deleteAccount = () => {
    // todo
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
