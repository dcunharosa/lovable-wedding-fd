import PageLayout from "@/components/PageLayout";

const accommodations = [
  { name: "Sublime Comporta", desc: "Luxury hotel set among the rice fields and pine trees. Our top pick for a special stay.", price: "€€€" },
  { name: "Casas Na Areia", desc: "Stunning barefoot luxury houses with sand floors. An unforgettable experience.", price: "€€€" },
  { name: "Terra Comporta", desc: "Beautiful cabins and suites surrounded by nature. Great value.", price: "€€" },
  { name: "Airbnb & Local Rentals", desc: "Plenty of charming local houses available for rent. Perfect for groups.", price: "€–€€" },
];

export const StaySection = () => (
  <section id="stay" className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-20 text-center bg-[hsl(215_60%_68%)]" style={{ textShadow: "0 1px 6px rgba(0,0,0,0.15)" }}>
      <p className="font-body text-sm tracking-[0.3em] uppercase text-foreground/60 mb-4">Where to Rest</p>
      <h1 className="font-display text-5xl md:text-7xl font-light text-foreground mb-6">Stay</h1>
      <p className="font-display text-lg text-foreground/70 italic max-w-lg mb-16">
        We recommend booking early — September is a popular time in Comporta.
      </p>

      <div className="max-w-2xl w-full space-y-6 animate-fade-in">
        {accommodations.map((acc) => (
          <div key={acc.name} className="bg-accent/50 rounded-sm p-8 text-left flex justify-between items-start gap-4">
            <div>
              <h3 className="font-display text-2xl text-foreground mb-2">{acc.name}</h3>
              <p className="font-body text-sm text-foreground/70 leading-relaxed">{acc.desc}</p>
            </div>
            <span className="font-body text-xs tracking-widest text-foreground/50 shrink-0">{acc.price}</span>
          </div>
        ))}
      </div>
    </section>
);

const Stay = () => (
  <PageLayout>
    <StaySection />
  </PageLayout>
);

export default Stay;
