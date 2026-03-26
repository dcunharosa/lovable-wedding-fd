import PageLayout from "@/components/PageLayout";
import ComportaMap from "@/components/ComportaMap";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useTranslation } from "@/i18n";

export const StaySection = () => {
  const { t } = useTranslation();
  const mapRef = useScrollReveal<HTMLDivElement>();

  return (
    <section id="stay" className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-12 text-center bg-[hsl(40_30%_95%)]">
      <p className="font-body text-base tracking-[0.3em] uppercase mb-3" style={{ color: "hsla(220, 50%, 55%, 0.6)" }}>{t.stay.whereWellBe}</p>
      <h1 className="font-display text-5xl md:text-7xl font-light mb-4" style={{ color: "hsl(220, 50%, 55%)" }}>{t.stay.stay}</h1>
      <p className="font-display text-xl italic max-w-2xl mb-10" style={{ color: "hsla(220, 50%, 55%, 0.7)" }}>
        {t.stay.stayIntro}
      </p>

      <div ref={mapRef} className="scroll-fade-up w-full max-w-4xl">
        <ComportaMap />
      </div>
    </section>
  );
};

const Stay = () => (
  <PageLayout>
    <StaySection />
  </PageLayout>
);

export default Stay;
