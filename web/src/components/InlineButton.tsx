import { IconDefinition } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "../styles/components/InlineButton.scss";

type Props = {
  icon: IconDefinition;
  value: string;
};

function InlineButton(props: Props) {
  return (
    <button className="inline_button">
      <FontAwesomeIcon fixedWidth icon={props.icon} />
      <span className="inline_button__text">{props.value}</span>
    </button>
  );
}

export default InlineButton;
