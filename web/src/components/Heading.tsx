import { IconDefinition } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "../styles/components/Heading.scss";

type Props = {
  value: string;
  icon?: IconDefinition;
};

function Heading(props: Props) {
  return (
    <span className="heading">
      {props.icon && <FontAwesomeIcon size="1x" icon={props.icon} />}
      <span className="heading__text">{props.value}</span>
    </span>
  );
}

export default Heading;
