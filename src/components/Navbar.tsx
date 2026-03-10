import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Weekend", path: "/weekend" },
  { label: "Venue", path: "/venue" },
  { label: "Travel", path: "/travel" },
  { label: "Stay", path: "/stay" },
  { label: "FAQ", path: "/faq" },
];

const Navbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between bg-background/80 backdrop-blur-sm">
      <Link to="/" className="font-display text-xl italic text-foreground">
        Filipa & Duarte
      </Link>

      {/* Desktop nav */}
      <div className="hidden md:flex items-center gap-8">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`font-body text-sm tracking-widest uppercase text-foreground/90 hover:text-foreground transition-colors ${
              location.pathname === item.path ? "border-b border-foreground" : ""
            }`}
          >
            {item.label}
          </Link>
        ))}
        <Link
          to="/rsvp"
          className="font-body text-sm tracking-widest uppercase bg-primary text-primary-foreground px-6 py-2 rounded-sm hover:bg-primary/90 transition-colors"
        >
          RSVP
        </Link>
      </div>

      {/* Mobile toggle */}
      <button
        className="md:hidden text-foreground"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label={mobileOpen ? "Close menu" : "Open menu"}
        aria-expanded={mobileOpen}
      >
        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-sm flex flex-col items-center gap-4 py-6 md:hidden">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className="font-body text-sm tracking-widest uppercase text-foreground/90 hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/rsvp"
            onClick={() => setMobileOpen(false)}
            className="font-body text-sm tracking-widest uppercase bg-primary text-primary-foreground px-6 py-2 rounded-sm"
          >
            RSVP
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
