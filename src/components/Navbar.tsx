import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import AIChatDialog from "./AIChatDialog";
import { personal } from "@/config/resume-data";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      aria-label="Main navigation"
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-colors duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-sm border-b border-border/50" : ""
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <a href="#" className="text-xl font-heading font-bold tracking-tight">
          {personal.initials}
        </a>

        {/* Desktop links */}
        <div className="hidden sm:flex items-center gap-8">
          <a href="#experience" className="nav-link">
            Experience
          </a>
          <a href="#fit-check" className="nav-link">
            Fit Check
          </a>
          <div className="[&_button]:text-sm [&_button]:py-2 [&_button]:px-4">
            <AIChatDialog />
          </div>
        </div>

        {/* Mobile hamburger */}
        <div className="sm:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <button className="p-2 text-muted-foreground hover:text-foreground" aria-label="Open menu">
                <Menu className="w-6 h-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64 bg-card border-border">
              <div className="flex flex-col gap-6 mt-8">
                <a href="#experience" className="nav-link text-lg">
                  Experience
                </a>
                <a href="#fit-check" className="nav-link text-lg">
                  Fit Check
                </a>
                <div className="[&_button]:text-sm [&_button]:py-2 [&_button]:px-4">
                  <AIChatDialog />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
