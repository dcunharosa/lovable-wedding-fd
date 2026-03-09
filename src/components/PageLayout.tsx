import { ReactNode } from "react";
import Navbar from "./Navbar";

const PageLayout = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="pt-20">{children}</main>
    <footer className="py-8 text-center font-body text-sm text-foreground/50 tracking-widest uppercase">
      Filipa & Duarte — 12 de Setembro de 2026
    </footer>
  </div>
);

export default PageLayout;
