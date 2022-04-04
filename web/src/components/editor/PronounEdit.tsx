import { faArrowDown, faArrowUp, faRemove } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactTooltip from "react-tooltip";
import { PronounEdited, PronounType } from "../../lib/interfaces";
import { figureType } from "../../lib/types";

import "../../styles/components/editor/PronounEdit.scss";
import PronounIcon from "../profile/PronounIcon";

type Props = {
  pronoun: PronounEdited;
  pronounsCount: number;
  onRemove(): void;
  onUpdate(newValue: PronounEdited): void;
  onRearrange(diff: number): void;
};

function PronounEdit({ pronoun, pronounsCount, onUpdate, onRearrange, onRemove }: Props) {
  const types = [
    PronounType.Primary,
    PronounType.Okay,
    PronounType.Friends,
    PronounType.Nope,
  ];

  // Send update event to parent
  const update = (pronoun: PronounEdited) => {
    onUpdate(pronoun);
  };

  // Update the pronoun value
  const updatePronoun = (newValue: string) => {
    // Limit length
    if (newValue.length > 32) return;

    update({
      ...pronoun,
      pronoun: newValue,
    });
  };

  // Update the type of the pronoun
  const updateType = (newType: PronounType) => {
    update({
      ...pronoun,
      type: newType,
    });
  };

  // Move the pronoun up or down
  const updateOrder = (diff: number) => {
    onRearrange(diff);
  };

  // Remove current pronoun
  const remove = () => {
    onRemove();
  };

  return (
    <div className="pronoun_edit">
      <div className="pronoun_edit__reorder">
        <button onClick={() => remove()} className="pronoun_edit__button">
          <FontAwesomeIcon icon={faRemove} />
        </button>
        <button
          onClick={() => updateOrder(-1)}
          disabled={pronoun.order === 0}
          className="pronoun_edit__button reorder__arrow"
        >
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
        <button
          disabled={pronoun.order === pronounsCount - 1}
          onClick={() => updateOrder(1)}
          className="pronoun_edit__button eorder__arrow"
        >
          <FontAwesomeIcon icon={faArrowDown} />
        </button>
      </div>
      <input
        type="text"
        value={pronoun.pronoun}
        onChange={(e) => updatePronoun(e.target.value)}
        className="pronoun_edit__input"
      />
      <span className="pronoun_edit__types">
        {types.map((type) => (
          <button
            key={type}
            data-tip={figureType(type)}
            className={`pronoun_edit__type pronoun_edit__button ${
              pronoun.type === type ? "pronoun_edit__type--active" : ""
            }`}
            onClick={() => updateType(type)}
          >
            <PronounIcon type={type} key={type} />
          </button>
        ))}
      </span>
      <ReactTooltip className="pronoun__tooltip" effect="solid" />
    </div>
  );
}

export default PronounEdit;
