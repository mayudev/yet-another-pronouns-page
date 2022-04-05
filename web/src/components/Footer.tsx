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

      <span style={{ flex: 1 }} />

      <FooterItem
        icon={faCircleHalfStroke}
        value="Switch theme"
        onClick={() => themeSwitcher.toggle()}
      />
    </footer>
  );
}

export default Footer;
