import { ReactNode } from "react";
import Navbar from "./Navbar";
import { useTranslation } from "@/i18n";

const PageLayout = ({ children }: { children: ReactNode }) => {
  const { t } = useTranslation();

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
