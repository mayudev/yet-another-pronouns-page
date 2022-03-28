import { IconDefinition } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  value?: string;
  icon?: IconDefinition;
  onClick?: () => void;
};

function FooterItem(props: Props) {
  return (
    <span
      className={"footer__item " + (props.onClick && "item__clickable")}
      onClick={props.onClick}
    >
      {props.icon && <FontAwesomeIcon icon={props.icon} />}
      {props.value && <span className={props.icon && "item__text"}>{props.value}</span>}
    </span>
  );
}

export default FooterItem;
