import PageLayout from "@/components/PageLayout";
import { CalendarPlus, ExternalLink } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

function makeIcs(title: string, start: string, end: string, location: string, description: string) {
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Wedding//EN",
    "BEGIN:VEVENT",
    `DTSTART;TZID=Europe/Lisbon:${start}`,
    `DTEND;TZID=Europe/Lisbon:${end}`,
    `SUMMARY:${title}`,
    `LOCATION:${location}`,
    `DESCRIPTION:${description}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  return "data:text/calendar;charset=utf-8," + encodeURIComponent(ics);
}

const calendarEvents = {
  welcomeDrinks: makeIcs(
    "Filipa & Duarte — Welcome Drinks",
    "20260911T180000",
    "20260911T230000",
    "Comporta, Portugal",
    "Casual gathering at the beach with drinks & music.",
  ),
  ceremony: makeIcs(
    "Filipa & Duarte — Wedding",
    "20260912T123000",
    "20260913T020000",
    "Comporta, Portugal",
    "Ceremony at 1pm, cocktail at 2pm, lunch & party from 3:30pm.",
  ),
};

export const WeekendSection = () => {
  const gridRef = useScrollReveal<HTMLDivElement>(".weekend-col");

  return (
    <section id="weekend" className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-20 bg-[hsl(220_55%_75%)]" style={{ textShadow: "0 1px 6px rgba(0,0,0,0.15)" }}>
      <p className="font-body text-base tracking-[0.3em] uppercase text-foreground/60 mb-4">The Plan</p>
      <h1 className="font-display text-5xl md:text-7xl font-light text-foreground mb-16">The Weekend</h1>

      <div ref={gridRef} className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
        {/* Friday */}
        <div className="weekend-col scroll-fade-left border-l border-foreground/20 pl-8 space-y-6" style={{ transitionDelay: "0.1s" }}>
          <div className="pb-2 mb-2 border-b border-foreground/10">
            <p className="font-body text-sm tracking-[0.2em] uppercase text-foreground/50 mb-1">Friday</p>
            <h3 className="font-display text-3xl text-foreground">Welcome Drinks</h3>
          </div>

          <div className="bg-white/[0.07] rounded-lg p-6 border border-white/[0.1]">
            <span className="inline-block font-body text-xs tracking-widest uppercase text-foreground/80 bg-white/[0.12] px-3 py-1 rounded-full mb-4">
              From 6pm
            </span>
            <p className="font-body text-base text-foreground/70 leading-relaxed mb-3">
              A casual gathering at the beach with drinks & music to get the weekend started. For those with the energy for 2 nights in a row! :)
            </p>
            <a
              href={calendarEvents.welcomeDrinks}
              download="welcome-drinks.ics"
              className="inline-flex items-center gap-1.5 font-body text-xs tracking-widest uppercase text-foreground/50 hover:text-foreground/80 transition-colors"
            >
              <CalendarPlus size={13} />
              Add to calendar
            </a>
          </div>

          <div className="bg-[hsl(40_30%_95%_/_0.08)] rounded-lg p-6 border border-[hsl(40_30%_95%_/_0.15)]">
            <p className="font-body text-xs tracking-[0.25em] uppercase text-foreground/60 mb-2">Dress Code</p>
            <p className="font-body text-base text-foreground/70 leading-relaxed">
              Casual beach vibes. Think shorts, sundresses, and sandals.
            </p>
          </div>
        </div>

        {/* Saturday */}
        <div className="weekend-col scroll-fade-right border-l border-foreground/20 pl-8 space-y-6" style={{ transitionDelay: "0.2s" }}>
          <div className="pb-2 mb-2 border-b border-foreground/10">
            <p className="font-body text-sm tracking-[0.2em] uppercase text-foreground/50 mb-1">Saturday</p>
            <h3 className="font-display text-3xl text-foreground">The Wedding Day</h3>
          </div>

          <div className="bg-white/[0.07] rounded-lg p-6 border border-white/[0.1]">
            <h4 className="font-display text-2xl text-foreground mb-1">Ceremony</h4>
            <span className="inline-block font-body text-xs tracking-widest uppercase text-foreground/80 bg-white/[0.12] px-3 py-1 rounded-full mb-4">
              1pm
            </span>
            <p className="font-body text-base text-foreground/70 leading-relaxed mb-3">
              An intimate ceremony in the countryside.<br />
              Please arrive by 12:30.
            </p>
            <a
              href={calendarEvents.ceremony}
              download="wedding-ceremony.ics"
              className="inline-flex items-center gap-1.5 font-body text-xs tracking-widest uppercase text-foreground/50 hover:text-foreground/80 transition-colors"
            >
              <CalendarPlus size={13} />
              Add to calendar
            </a>
          </div>

          <div className="bg-white/[0.07] rounded-lg p-6 border border-white/[0.1]">
            <h4 className="font-display text-2xl text-foreground mb-1">Cocktail</h4>
            <span className="inline-block font-body text-xs tracking-widest uppercase text-foreground/80 bg-white/[0.12] px-3 py-1 rounded-full mb-4">
              2pm
            </span>
            <p className="font-body text-base text-foreground/70 leading-relaxed">
              Drinks, music and canapés served by the pool.
            </p>
          </div>

          <div className="bg-white/[0.07] rounded-lg p-6 border border-white/[0.1]">
            <h4 className="font-display text-2xl text-foreground mb-1">Late Lunch & Party</h4>
            <span className="inline-block font-body text-xs tracking-widest uppercase text-foreground/80 bg-white/[0.12] px-3 py-1 rounded-full mb-4">
              3:30pm
            </span>
            <p className="font-body text-base text-foreground/70 leading-relaxed">
              Lunch served while you can keep on dancing until late.
            </p>
          </div>

          <div className="bg-[hsl(40_30%_95%_/_0.08)] rounded-lg p-6 border border-[hsl(40_30%_95%_/_0.15)]">
            <p className="font-body text-xs tracking-[0.25em] uppercase text-foreground/60 mb-2">Dress Code</p>
            <p className="font-body text-base text-foreground/70 leading-relaxed mb-6">
              Smart casual with a countryside twist. Think linen, light fabrics, and comfortable shoes for sandy paths. Leave the stilettos at home!
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              {/* TODO: Replace # with actual inspiration links */}
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 border border-foreground/30 text-foreground/80 font-body text-sm tracking-widest uppercase rounded-sm hover:bg-foreground/10 transition-colors"
              >
                <ExternalLink size={14} />
                Inspiration for Him
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 border border-foreground/30 text-foreground/80 font-body text-sm tracking-widest uppercase rounded-sm hover:bg-foreground/10 transition-colors"
              >
                <ExternalLink size={14} />
                Inspiration for Her
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
