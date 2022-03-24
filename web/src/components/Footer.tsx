import "../styles/components/Footer.scss";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faIceCream } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Footer() {
  return (
    <footer>
      <a href="https://github.com/mayudev">
        <FontAwesomeIcon className="footer__item" icon={faGithub} />
      </a>
      <span className="footer__item">yet another pronouns page</span>
      <FontAwesomeIcon className="footer__item" icon={faIceCream} />
    </footer>
  );
}

export default Footer;
