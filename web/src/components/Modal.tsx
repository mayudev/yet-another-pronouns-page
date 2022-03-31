import { createPortal } from "react-dom";
import "../styles/components/Modal.scss";

type Props = {
  message: string;
};

function Modal(props: Props) {
  const renderDialog = () => {
    return <div className="dialog">{props.message}</div>;
  };

  return createPortal(renderDialog(), document.body);
}

export default Modal;
