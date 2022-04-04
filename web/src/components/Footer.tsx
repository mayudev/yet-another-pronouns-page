import "../styles/components/Footer.scss";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faCircleHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../lib/useTheme";
import FooterItem from "./controls/FooterIcon";

function Footer() {
  const themeSwitcher = useTheme();

  return (
    <footer>
      <a href="https://github.com/mayudev/yet-another-pronouns-page">
        <FooterItem icon={faGithub} />
      </a>
      <FooterItem value="yet another pronouns page" />

      <span style={{ flex: 1 }} />

      <FooterItem
        icon={faCircleHalfStroke}
        value="Switch theme"
        onClick={() => themeSwitcher.toggle()}
      />
      {/* <FontAwesomeIcon className="footer__item" icon={faIceCream} />
      <FontAwesomeIcon
        className="footer__item"
        icon={faCircleHalfStroke}
        onClick={() => switchTheme.toggle()}
      /> */}
    </footer>
  );
}

export default Footer;
