import { personal } from "@/config/resume-data";

const Footer = () => {
  return (
    <footer className="py-8 px-6 border-t border-border">
      <div className="max-w-3xl mx-auto text-xs text-muted-foreground">
        <span>&copy; {new Date().getFullYear()} {personal.name}</span>
      </div>
    </footer>
  );
};

export default Footer;
