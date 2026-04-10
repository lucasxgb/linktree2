import { Social } from "../../components/social/index.tsx";
import { FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";
export function SocialFooter() {
  return (
    <footer className="flex justify-center gap-3 my-4">
      <Social url="https://www.linkedin.com/in/lucasxgb/">
        {<FaLinkedin size={35} color="#1c1c1c" />}
      </Social>
      <Social url="https://github.com/lucasxgb">
        {<FaGithub size={35} color="#1c1c1c" />}
      </Social>
      <Social url="https://www.instagram.com/gabriel.mxt/">
        {<FaInstagram size={35} color="#1c1c1c" />}
      </Social>
    </footer>
  );
}
