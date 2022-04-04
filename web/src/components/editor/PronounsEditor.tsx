import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../lib/context/login";
import { Pronoun, PronounEdited, PronounType } from "../../lib/interfaces";
import PronounEdit from "./PronounEdit";
import PronounInput from "./PronounInput";

type Props = {
  onMessage(message: string): void;
};

function PronounsEditor(props: Props) {
  const loginContext = useContext(LoginContext);
  const [current, setCurrent] = useState<PronounEdited[]>([]);
  const [edited, setEdited] = useState(false);

  const updatePronoun = (i: number, newValue: PronounEdited) => {
    const currentCopy = Array.from(current);

    currentCopy[i] = newValue;
    setCurrent(currentCopy);
    setEdited(true);
  };

  const rearrangePronoun = (i: number, diff: number) => {
    if (i + diff < 0 || i + diff >= current.length) return;
    const currentCopy = Array.from(current);

    // Swap neighboring elements
    currentCopy[i].order += diff;
    currentCopy[i + diff].order -= diff;

    // Sort by order
    currentCopy.sort((a, b) => a.order - b.order);

    setCurrent(currentCopy);
    setEdited(true);
  };

  const removePronoun = (i: number) => {
    let currentCopy = Array.from(current);

    currentCopy.splice(i, 1);

    // Calculate new orders
    currentCopy = currentCopy.map((v, i) => ({
      ...v,
      order: i,
    }));

    setCurrent(currentCopy);
    setEdited(true);
  };

  const addPronoun = (value: string) => {
    let currentCopy = Array.from(current);

    // Figure out initial value
    const initialOrder = Math.max(...currentCopy.map((p) => p.initialOrder)) + 1;

    let newPronoun: PronounEdited = {
      order: current.length,
      pronoun: value,
      type: PronounType.Okay,
      initialOrder,
    };

    currentCopy.push(newPronoun);

    setCurrent(currentCopy);
    setEdited(true);
  };

  useEffect(() => {
    // Loadd current values from context
    if (loginContext.loggedIn && loginContext.initalized) {
      const initialPronouns = loginContext.pronouns.map((p, i) => {
        return {
          ...p,
          initialOrder: i,
        };
      });

      setCurrent(initialPronouns);
    }
  }, [loginContext]);

  const submit = async () => {
    if (!edited) return;
    let body: {
      pronouns: Pronoun[];
    } = {
      pronouns: [],
    };

    body.pronouns = current;

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

      props.onMessage("Pronouns updated!");

      loginContext.pronouns = current;
      setEdited(false);
    } catch (e) {
      console.log(e);
      props.onMessage("Something went wrong.");
    }
  };

  return (
    <div>
      <div className="pronouns_editor">
        <div className="pronoun_editor__pane">
          {current.map((pronoun, i) => (
            <PronounEdit
              key={pronoun.initialOrder}
              pronoun={pronoun}
              pronounsCount={current.length}
              onUpdate={(nval) => updatePronoun(i, nval)}
              onRearrange={(diff) => rearrangePronoun(i, diff)}
              onRemove={() => removePronoun(i)}
            />
          ))}
          <PronounInput onSubmit={(val) => addPronoun(val)} />
        </div>
      </div>
      <button onClick={submit} disabled={!edited} className="button">
        Save
      </button>
    </div>
  );
}

export default PronounsEditor;
