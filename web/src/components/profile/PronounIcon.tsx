import {
  faHeart,
  faQuestion,
  faThumbsUp,
  faUserGroup,
  faXmarkSquare,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PronounType } from "../../lib/interfaces";
import "../../styles/components/profile/PronounIcon.scss";

type Props = {
  type: PronounType;
};

function PronounIcon(props: Props) {
  const icon = (): IconDefinition => {
    switch (props.type) {
      case PronounType.Primary:
        return faHeart;
      case PronounType.Okay:
        return faThumbsUp;
      case PronounType.Friends:
        return faUserGroup;
      case PronounType.Nope:
        return faXmarkSquare;
      default:
        return faQuestion;
    }
  };

  return <FontAwesomeIcon fixedWidth icon={icon()} />;
}

export default PronounIcon;
