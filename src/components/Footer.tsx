import { ArrowUpRight } from "lucide-react";
import { personal } from "@/config/resume-data";

const Footer = () => {
  return (
    <footer className="score-footer">
      <div className="score-footer__name">{personal.name}</div>
      <div className="score-footer__meta">
        <a href="mailto:hello@linusthofte.com">Email me <ArrowUpRight aria-hidden="true" /></a>
        <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight aria-hidden="true" /></a>
        <a href="https://github.com/linus-arch" target="_blank" rel="noreferrer">GitHub <ArrowUpRight aria-hidden="true" /></a>
      </div>
    </footer>
  );
};

export default Footer;
