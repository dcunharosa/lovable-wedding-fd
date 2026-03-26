import PageLayout from "@/components/PageLayout";
import { Plane, Car, UserCheck } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useTranslation } from "@/i18n";

export const TravelSection = () => {
  const { t } = useTranslation();
  const cardsRef = useScrollReveal<HTMLDivElement>(".travel-card");

  return (
    <section id="travel" className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-20 text-center bg-[hsl(220_55%_75%)]" style={{ textShadow: "0 1px 6px rgba(0,0,0,0.15)" }}>
      <p className="font-body text-base tracking-[0.3em] uppercase text-foreground/60 mb-4">{t.travel.gettingThere}</p>
      <h1 className="font-display text-5xl md:text-7xl font-light text-foreground mb-16">{t.travel.travel}</h1>

      <div ref={cardsRef} className="max-w-4xl w-full space-y-10">
        <div className="travel-card scroll-fade-up border-l-2 border-foreground/30 pl-8 py-6 text-left hover:border-foreground/60 transition-colors duration-300" style={{ transitionDelay: "0.1s" }}>
          <div className="flex items-center gap-3 mb-4">
            <Plane size={20} className="text-foreground/60" />
            <h3 className="font-display text-3xl text-foreground">{t.travel.byAir}</h3>
          </div>
          <p className="font-body text-base text-foreground/70 leading-relaxed">
            {t.travel.byAirDesc}
          </p>
        </div>

        <div className="travel-card scroll-fade-up border-l-2 border-foreground/30 pl-8 py-6 text-left hover:border-foreground/60 transition-colors duration-300" style={{ transitionDelay: "0.2s" }}>
          <div className="flex items-center gap-3 mb-4">
            <Car size={20} className="text-foreground/60" />
            <h3 className="font-display text-3xl text-foreground">{t.travel.byCar}</h3>
          </div>
          <p className="font-body text-base text-foreground/70 leading-relaxed">
            {t.travel.byCarDesc}
          </p>
        </div>

        <div className="travel-card scroll-fade-up border-l-2 border-foreground/30 pl-8 py-6 text-left hover:border-foreground/60 transition-colors duration-300" style={{ transitionDelay: "0.3s" }}>
          <div className="flex items-center gap-3 mb-4">
            <UserCheck size={20} className="text-foreground/60" />
            <h3 className="font-display text-3xl text-foreground">{t.travel.transfers}</h3>
          </div>
          <div className="font-body text-base text-foreground/70 leading-relaxed space-y-3">
            {t.travel.transfersDesc.split("\n").map((paragraph, i, arr) => (
              <p key={i} className={i === arr.length - 1 ? "italic" : undefined}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Travel = () => (
  <PageLayout>
    <TravelSection />
  </PageLayout>
);

export default Travel;
