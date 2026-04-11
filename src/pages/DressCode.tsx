import PageLayout from "@/components/PageLayout";
import { ExternalLink } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useTranslation } from "@/i18n";

export const DressCodeSection = () => {
  const { t } = useTranslation();
  const contentRef = useScrollReveal<HTMLDivElement>();

  return (
    <section id="dresscode" className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-20 text-center bg-[hsl(40_30%_95%)]">
      <p className="font-body text-base tracking-[0.3em] uppercase mb-3" style={{ color: "hsla(220, 50%, 55%, 0.6)" }}>
        {t.dressCode.sectionLabel}
      </p>
      <h1 className="font-display text-5xl md:text-7xl font-light mb-4" style={{ color: "hsl(220, 50%, 55%)" }}>
        {t.dressCode.title}
      </h1>
      <p className="font-display text-xl italic mb-10" style={{ color: "hsla(220, 50%, 55%, 0.7)" }}>
        {t.dressCode.subtitle}
      </p>

      <div ref={contentRef} className="scroll-fade-up max-w-2xl w-full space-y-5 text-left" style={{ color: "hsl(220, 50%, 45%)" }}>
        <p className="font-body text-base leading-relaxed">{t.dressCode.para1}</p>
        <p className="font-body text-base leading-relaxed">{t.dressCode.para2}</p>
        <p className="font-body text-base leading-relaxed">{t.dressCode.para3}</p>
        <p className="font-body text-base leading-relaxed">{t.dressCode.para4}</p>
      </div>

      <div className="mt-10 space-y-4">
        <p className="font-body text-sm tracking-widest uppercase" style={{ color: "hsla(220, 50%, 55%, 0.7)" }}>
          {t.dressCode.inspirationLabel}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="https://pin.it/2tUm1nliO"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 px-6 py-2.5 border rounded-sm font-body text-xs tracking-wider uppercase transition-colors hover:bg-foreground/10"
            style={{ borderColor: "hsla(220, 50%, 55%, 0.3)", color: "hsl(220, 50%, 50%)" }}
          >
            <ExternalLink size={12} />
            {t.dressCode.inspirationHim}
          </a>
          <a
            href="https://pin.it/1509lQmGi"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 px-6 py-2.5 border rounded-sm font-body text-xs tracking-wider uppercase transition-colors hover:bg-foreground/10"
            style={{ borderColor: "hsla(220, 50%, 55%, 0.3)", color: "hsl(220, 50%, 50%)" }}
          >
            <ExternalLink size={12} />
            {t.dressCode.inspirationHer}
          </a>
        </div>
      </div>
    </section>
  );
};

const DressCode = () => (
  <PageLayout>
    <DressCodeSection />
  </PageLayout>
);

export default DressCode;
