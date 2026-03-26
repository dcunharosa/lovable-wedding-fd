import PageLayout from "@/components/PageLayout";
import { CalendarPlus, ExternalLink } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useTranslation } from "@/i18n";
import { googleCalUrl, VENUE_LOCATION } from "@/lib/googleCalUrl";

export const WeekendSection = () => {
  const { t } = useTranslation();
  const gridRef = useScrollReveal<HTMLDivElement>(".weekend-col");

  const calendarEvents = {
    welcomeDrinks: googleCalUrl(
      t.calendar.welcomeDrinksTitle,
      "20260911T180000",
      "20260911T230000",
      VENUE_LOCATION,
      t.calendar.welcomeDrinksDetails,
    ),
    ceremony: googleCalUrl(
      t.calendar.weddingTitle,
      "20260912T123000",
      "20260913T020000",
      VENUE_LOCATION,
      t.calendar.weddingDetails,
    ),
  };

  return (
    <section id="weekend" className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-20 bg-[hsl(220_55%_75%)]" style={{ textShadow: "0 1px 6px rgba(0,0,0,0.15)" }}>
      <p className="font-body text-base tracking-[0.3em] uppercase text-foreground/60 mb-4">{t.weekend.thePlan}</p>
      <h1 className="font-display text-5xl md:text-7xl font-light text-foreground mb-16">{t.weekend.theWeekend}</h1>

      <div ref={gridRef} className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
        {/* Friday */}
        <div className="weekend-col scroll-fade-left border-l border-foreground/20 pl-8 space-y-6" style={{ transitionDelay: "0.1s" }}>
          <div className="pb-2 mb-2 border-b border-foreground/10">
            <p className="font-body text-sm tracking-[0.2em] uppercase text-foreground/50 mb-1">{t.weekend.fridayDate}</p>
            <h3 className="font-display text-3xl text-foreground">{t.weekend.fridayTitle}</h3>
          </div>

          <div className="bg-white/[0.07] rounded-lg p-6 border border-white/[0.1]">
            <span className="inline-block font-body text-xs tracking-widest uppercase text-foreground/80 bg-white/[0.12] px-3 py-1 rounded-full mb-4">
              {t.weekend.fridayTime}
            </span>
            <p className="font-body text-base text-foreground/70 leading-relaxed mb-3">
              {t.weekend.fridayDesc}
            </p>
            <p className="font-body text-sm text-foreground/60 italic mb-3">
              {t.weekend.fridayLocation}
            </p>
            <a
              href={calendarEvents.welcomeDrinks}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-body text-xs tracking-widest uppercase text-foreground/50 hover:text-foreground/80 transition-colors"
            >
              <CalendarPlus size={13} />
              {t.weekend.addToCalendar}
            </a>
          </div>

          <div className="pt-2">
            <p className="font-body text-xs tracking-[0.25em] uppercase text-foreground/60 mb-2">{t.weekend.dressCode}</p>
            <p className="font-body text-base text-foreground/70 leading-relaxed">
              {t.weekend.fridayDressCode}
            </p>
          </div>
        </div>

        {/* Saturday */}
        <div className="weekend-col scroll-fade-right border-l border-foreground/20 pl-8 space-y-6" style={{ transitionDelay: "0.2s" }}>
          <div className="pb-2 mb-2 border-b border-foreground/10">
            <p className="font-body text-sm tracking-[0.2em] uppercase text-foreground/50 mb-1">{t.weekend.saturdayDate}</p>
            <h3 className="font-display text-3xl text-foreground">{t.weekend.saturdayTitle}</h3>
          </div>

          <div className="bg-white/[0.07] rounded-lg p-6 border border-white/[0.1]">
            <h4 className="font-display text-2xl text-foreground mb-1">{t.weekend.ceremony}</h4>
            <span className="inline-block font-body text-xs tracking-widest uppercase text-foreground/80 bg-white/[0.12] px-3 py-1 rounded-full mb-4">
              {t.weekend.ceremonyTime}
            </span>
            <p className="font-body text-base text-foreground/70 leading-relaxed mb-3">
              {t.weekend.ceremonyDesc.split("\n").map((line, i) => (
                <span key={i}>
                  {i > 0 && <br />}
                  {line}
                </span>
              ))}
            </p>
            <a
              href={calendarEvents.ceremony}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-body text-xs tracking-widest uppercase text-foreground/50 hover:text-foreground/80 transition-colors"
            >
              <CalendarPlus size={13} />
              {t.weekend.addToCalendar}
            </a>
          </div>

          <div className="bg-white/[0.07] rounded-lg p-6 border border-white/[0.1]">
            <h4 className="font-display text-2xl text-foreground mb-1">{t.weekend.partyTime}</h4>
            <span className="inline-block font-body text-xs tracking-widest uppercase text-foreground/80 bg-white/[0.12] px-3 py-1 rounded-full mb-4">
              {t.weekend.partyTimeSpan}
            </span>
            <p className="font-body text-base text-foreground/70 leading-relaxed">
              {t.weekend.partyDesc}
            </p>
          </div>

          <div className="pt-2">
            <p className="font-body text-xs tracking-[0.25em] uppercase text-foreground/60 mb-2">{t.weekend.dressCode}</p>
            <p className="font-body text-base text-foreground/70 leading-relaxed mb-6">
              {t.weekend.saturdayDressCode}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://pin.it/2tUm1nliO"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 border border-foreground/30 text-foreground/80 font-body text-xs tracking-wider uppercase rounded-sm hover:bg-foreground/10 transition-colors"
              >
                <ExternalLink size={12} />
                {t.weekend.inspirationHim}
              </a>
              <a
                href="https://pin.it/1509lQmGi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 border border-foreground/30 text-foreground/80 font-body text-xs tracking-wider uppercase rounded-sm hover:bg-foreground/10 transition-colors"
              >
                <ExternalLink size={12} />
                {t.weekend.inspirationHer}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Weekend = () => (
  <PageLayout>
    <WeekendSection />
  </PageLayout>
);

export default Weekend;
