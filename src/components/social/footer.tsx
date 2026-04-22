import { Social } from "../../components/social/index.tsx";
import { FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";
interface SocialLinkProps{
  linkedin?: string,
  instagram?: string,
  github?: string,
}

export function SocialFooter({linkedin, instagram, github}:SocialLinkProps) {
  return (
    <footer className="flex justify-center gap-3 my-4">
     {linkedin &&  (<Social url={linkedin}>
        {<FaLinkedin size={35} color="#1c1c1c" />}
      </Social>)
      
     }
     {github && (
     <Social url={github}>
        {<FaGithub size={35} color="#1c1c1c" />}
      </Social>
     )

     }
      {instagram && (
        <Social url={instagram}>
        {<FaInstagram size={35} color="#1c1c1c" />}
      </Social>
      )
      }
    </footer>
  );
}
