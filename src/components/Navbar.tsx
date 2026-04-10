import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, MessageSquare } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import AIChatDialog from "./AIChatDialog";
import { personal } from "@/config/resume-data";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileChatOpen, setMobileChatOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!location.hash) {
      return;
    }

    const elementId = location.hash.replace("#", "");
    const element = document.getElementById(elementId);
    if (!element) {
      return;
    }

    window.requestAnimationFrame(() => {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [location.hash, location.pathname]);

  return (
    <nav
      aria-label="Main navigation"
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-colors duration-300 ${
        scrolled ? "bg-background/85 backdrop-blur-sm border-b border-border/50" : "bg-background/65 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-xl font-heading font-bold tracking-tight">
          {personal.initials}
        </Link>

        {/* Desktop links */}
        <div className="hidden sm:flex items-center gap-8">
          <Link to="/#experience" className="nav-link">
            Experience
          </Link>
          <Link to="/music" className="nav-link">
            Music
          </Link>
          <Link to="/trends" className="nav-link">
            Trends
          </Link>
          <Link to="/#fit-check" className="nav-link">
            Fit Check
          </Link>
          <div className="[&_button]:text-sm [&_button]:py-2 [&_button]:px-4">
            <AIChatDialog />
          </div>
        </div>

        {/* Mobile hamburger */}
        <div className="sm:hidden">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button className="p-2 text-muted-foreground hover:text-foreground" aria-label="Open menu">
                <Menu className="w-6 h-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64 bg-card border-border">
              <div className="flex flex-col gap-6 mt-8">
                <Link to="/#experience" className="nav-link text-lg" onClick={() => setMobileOpen(false)}>
                  Experience
                </Link>
                <Link to="/music" className="nav-link text-lg" onClick={() => setMobileOpen(false)}>
                  Music
                </Link>
                <Link to="/trends" className="nav-link text-lg" onClick={() => setMobileOpen(false)}>
                  Trends
                </Link>
                <Link to="/#fit-check" className="nav-link text-lg" onClick={() => setMobileOpen(false)}>
                  Fit Check
                </Link>
                <button
                  type="button"
                  className="btn-primary justify-center"
                  onClick={() => {
                    setMobileOpen(false);
                    setMobileChatOpen(true);
                  }}
                >
                  <MessageSquare className="w-4 h-4" />
                  Ask AI About Me
                </button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <AIChatDialog open={mobileChatOpen} onOpenChange={setMobileChatOpen} showTrigger={false} />
    </nav>
  );
};

export default Navbar;
