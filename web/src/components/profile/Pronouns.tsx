import { Pronoun, PronounType } from "../../lib/interfaces";
import PronounIcon from "./PronounIcon";
import "../../styles/components/profile/Pronouns.scss";
import ReactTooltip from "react-tooltip";
import { figureType } from "../../lib/types";

type Props = {
  pronouns: Pronoun[];
};

function Pronouns(props: Props) {
  const pronouns = props.pronouns.sort((a, b) => {
    // Always show Primary type first
    if (a.type === PronounType.Primary && b.type === PronounType.Primary) {
      // Skip to usual
    } else if (a.type === PronounType.Primary) {
      return -1;
    } else if (b.type === PronounType.Primary) {
      return 1;
    }

    return a.order - b.order;
  });

  const display = pronouns.map((pronoun) => (
    <>
      <div
        className={`pronoun ${
          pronoun.type === PronounType.Primary ? "pronoun--primary" : ""
        }`}
        key={pronoun.order}
      >
        <span data-tip={figureType(pronoun.type)} className="pronoun__icon">
          <PronounIcon type={pronoun.type} />
        </span>
        <span className="pronoun__value">{pronoun.pronoun}</span>
      </div>
      <ReactTooltip className="pronoun__tooltip" effect="solid" />
    </>
  ));
  return <div className="pronouns">{display}</div>;
}

export default Pronouns;
