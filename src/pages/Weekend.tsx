import PageLayout from "@/components/PageLayout";

const events = [
  { time: "Friday, Sept 11", title: "Welcome Drinks", desc: "Casual gathering at the beach bar. Come as you are." },
  { time: "Saturday, Sept 12 — 16:00", title: "Ceremony", desc: "An intimate ceremony at the dunes, overlooking the ocean." },
  { time: "Saturday, Sept 12 — 18:00", title: "Cocktail Hour", desc: "Drinks & canapés in the garden as the sun sets." },
  { time: "Saturday, Sept 12 — 20:00", title: "Dinner & Party", desc: "Dinner under the stars, followed by dancing until late." },
  { time: "Sunday, Sept 13 — 11:00", title: "Farewell Brunch", desc: "A relaxed goodbye over brunch by the pool." },
];

const Weekend = () => (
  <PageLayout>
    <section className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-20">
      <p className="font-body text-sm tracking-[0.3em] uppercase text-foreground/60 mb-4">The Plan</p>
      <h1 className="font-display text-5xl md:text-7xl font-light text-foreground mb-16">The Weekend</h1>

      <div className="max-w-2xl w-full space-y-12">
        {events.map((event, i) => (
          <div key={event.title} className="border-l border-foreground/20 pl-8 animate-fade-in" style={{ animationDelay: `${i * 0.15}s` }}>
            <p className="font-body text-xs tracking-[0.2em] uppercase text-foreground/50 mb-1">{event.time}</p>
            <h3 className="font-display text-2xl text-foreground mb-2">{event.title}</h3>
            <p className="font-body text-sm text-foreground/70 leading-relaxed">{event.desc}</p>
          </div>
        ))}
      </div>
    </section>
  </PageLayout>
);

export default Weekend;
