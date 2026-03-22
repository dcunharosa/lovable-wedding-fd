import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useActiveSection } from "@/hooks/useActiveSection";

const navItems = [
  { label: "Home", path: "/", id: "home" },
  { label: "Weekend", path: "/weekend", id: "weekend" },
  { label: "Venue", path: "/venue", id: "venue" },
  { label: "Travel", path: "/travel", id: "travel" },
  { label: "Stay", path: "/stay", id: "stay" },
  { label: "Gifts", path: "/gifts", id: "gifts" },
  { label: "FAQ", path: "/faq", id: "faq" },
];

const sectionIds = [...navItems.map((i) => i.id), "rsvp"];

const Navbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isRoot = location.pathname === "/";
  const activeSection = useActiveSection(sectionIds, isRoot);

  const isItemActive = (item: { path: string; id: string }) =>
    isRoot ? activeSection === item.id : location.pathname === item.path;

  const itemCls = (active: boolean) =>
    `font-body text-sm tracking-widest uppercase text-foreground/90 hover:text-foreground transition-colors${active ? " border-b border-foreground" : ""}`;

  const rsvpCls =
    "font-body text-sm tracking-widest uppercase bg-primary text-primary-foreground px-6 py-2 rounded-sm hover:bg-primary/90 transition-colors";

  const mobileLinkCls =
    "font-body text-sm tracking-widest uppercase text-foreground/90 hover:text-foreground";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between bg-background/80 backdrop-blur-sm">
      {isRoot ? (
        <a href="#home" className="font-display text-xl italic text-foreground">
          Filipa &amp; Duarte
        </a>
      ) : (
        <Link to="/" className="font-display text-xl italic text-foreground">
          Filipa &amp; Duarte
        </Link>
      )}

      {/* Desktop nav */}
      <div className="hidden md:flex items-center gap-8">
        {navItems.map((item) =>
          isRoot ? (
            <a key={item.id} href={`#${item.id}`} className={itemCls(isItemActive(item))}>
              {item.label}
            </a>
          ) : (
            <Link key={item.id} to={item.path} className={itemCls(isItemActive(item))}>
              {item.label}
            </Link>
          )
        )}
        {isRoot ? (
          <a href="#rsvp" className={rsvpCls}>
            RSVP
          </a>
        ) : (
          <Link to="/rsvp" className={rsvpCls}>
            RSVP
          </Link>
        )}
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
          {navItems.map((item) =>
            isRoot ? (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setMobileOpen(false)}
                className={mobileLinkCls}
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.id}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={mobileLinkCls}
              >
                {item.label}
              </Link>
            )
          )}
          {isRoot ? (
            <a href="#rsvp" onClick={() => setMobileOpen(false)} className={rsvpCls}>
              RSVP
            </a>
          ) : (
            <Link to="/rsvp" onClick={() => setMobileOpen(false)} className={rsvpCls}>
              RSVP
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
