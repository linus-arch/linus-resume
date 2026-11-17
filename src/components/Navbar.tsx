import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const links = [
  { label: "Work", href: "/#experience" },
  { label: "Music", href: "/#music" },
  { label: "Tools", href: "/#tools" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (!open) {
      return;
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  useEffect(() => {
    let previousY = window.scrollY;
    const handleScroll = () => {
      const currentY = window.scrollY;
      setHidden(currentY > previousY && currentY > 80);
      if (currentY < previousY) setHidden(false);
      previousY = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`site-nav${hidden ? " site-nav--hidden" : ""}`}>
      <Link to="/" className="site-nav__wordmark">
        LT<span>.</span>
      </Link>

      <nav className="site-nav__links" aria-label="Main navigation">
        {links.map((link) => (
          <Link key={link.label} to={link.href} className="nav-draw">
            {link.label}
          </Link>
        ))}
        {location.pathname !== "/" && (
          <Link to="/" className="nav-draw">Home</Link>
        )}
      </nav>

      <button
        className="site-nav__menu"
        type="button"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        onClick={() => setOpen((current) => !current)}
      >
        {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        <span>{open ? "Close" : "Menu"}</span>
      </button>

      {open && (
        <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">
          {links.map((link) => (
            <Link key={link.label} to={link.href} onClick={() => setOpen(false)}>
              <span>{link.label}</span>
              <span aria-hidden="true">↗</span>
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Navbar;
