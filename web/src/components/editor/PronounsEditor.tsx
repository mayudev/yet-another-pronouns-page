import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../lib/context/login";
import { PronounEdited } from "../../lib/interfaces";
import PronounEdit from "./PronounEdit";

type Props = {
  onMessage(message: string): void;
};

function PronounsEditor(props: Props) {
  const loginContext = useContext(LoginContext);
  const [current, setCurrent] = useState<PronounEdited[]>([]);

  const updatePronoun = (i: number, newValue: PronounEdited) => {
    const currentCopy = Array.from(current);

    currentCopy[i] = newValue;
    setCurrent(currentCopy);
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

  return (
    <div className="pronoun_edit__list">
      {current.map((pronoun, i) => (
        <PronounEdit
          key={pronoun.initialOrder}
          pronoun={pronoun}
          pronounsCount={current.length}
          onUpdate={(nval) => updatePronoun(i, nval)}
          onRearrange={(diff) => rearrangePronoun(i, diff)}
        />
      ))}
    </div>
  );
}

export default PronounsEditor;
