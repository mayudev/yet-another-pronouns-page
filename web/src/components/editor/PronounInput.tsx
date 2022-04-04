import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { KeyboardEvent, useState } from "react";
import "../../styles/components/editor/PronounEdit.scss";

type Props = {
  onSubmit(pronoun: string): void;
};

function PronounInput(props: Props) {
  const [value, setValue] = useState("");

  const submit = () => {
    if (value.length === 0 || value.length > 32) return;
    props.onSubmit(value);
    setValue("");
  };

  const keyPressed = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      submit();
    }
  };

  return (
    <div className="pronoun_edit">
      <button onClick={submit} className="pronoun_edit__button">
        <FontAwesomeIcon icon={faAdd} />
      </button>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="pronoun_edit__input"
        placeholder="Type here..."
        onKeyDown={keyPressed}
      />
    </div>
  );
}

export default PronounInput;
