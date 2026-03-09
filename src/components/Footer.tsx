import { personal } from "@/config/resume-data";

const Footer = () => {
  return (
    <footer className="py-8 px-6 border-t border-border/50">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <span>&copy; {new Date().getFullYear()} {personal.name}</span>
        <span>Built with AI Resume Template</span>
      </div>
    </footer>
  );
};

export default Footer;
