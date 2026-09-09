import { ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import { useTranslation } from "@/i18n";

const PageLayout = ({ children }: { children: ReactNode }) => {
  const { t } = useTranslation();
  const { hash } = useLocation();

  // Scroll to the hash target (e.g. /venue#directions, or /#venue). React
  // renders asynchronously, so the browser's native hash scroll fires before
  // the elements exist — and React Router never scrolls for a hash at all.
  useEffect(() => {
    if (!hash) return;
    const el = document.getElementById(hash.slice(1));
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, [hash]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">{children}</main>
      <footer className="py-8 text-center font-body text-sm text-foreground/50 tracking-widest uppercase">
        {t.footer.text}
      </footer>
    </div>
  );
};

export default PageLayout;
