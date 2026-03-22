import PageLayout from "@/components/PageLayout";

export const WeekendSection = () => (
  <section id="weekend" className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-20 bg-[hsl(220_55%_75%)]" style={{ textShadow: "0 1px 6px rgba(0,0,0,0.15)" }}>
    <p className="font-body text-base tracking-[0.3em] uppercase text-foreground/60 mb-4">The Plan</p>
    <h1 className="font-display text-5xl md:text-7xl font-light text-foreground mb-16">The Weekend</h1>

    <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 animate-fade-in">
      {/* Friday */}
      <div className="border-l border-foreground/20 pl-8 space-y-10">
        <div>
          <p className="font-body text-sm tracking-[0.2em] uppercase text-foreground/50 mb-1">Friday</p>
          <h3 className="font-display text-3xl text-foreground mb-2">Welcome Drinks</h3>
          <p className="font-body text-base tracking-widest uppercase text-foreground/60 mb-4">From 6pm</p>
          <p className="font-body text-base text-foreground/70 leading-relaxed">
            A casual gathering at the beach with drinks & music to get the weekend started. For those with the energy for 2 nights in a row! :)
          </p>
        </div>

        <div className="bg-foreground/10 rounded-sm p-6">
          <h4 className="font-display text-2xl text-foreground mb-2">Dress Code</h4>
          <p className="font-body text-base text-foreground/70 leading-relaxed">
            Casual beach vibes. Think shorts, sundresses, and sandals.
          </p>
        </div>
      </div>

      {/* Saturday */}
      <div className="border-l border-foreground/20 pl-8 space-y-10">
        <div>
          <p className="font-body text-sm tracking-[0.2em] uppercase text-foreground/50 mb-1">Saturday</p>
          <h3 className="font-display text-3xl text-foreground mb-6">The Wedding Day</h3>
        </div>

        <div>
          <h4 className="font-display text-2xl text-foreground mb-1">Ceremony</h4>
          <p className="font-body text-base tracking-widest uppercase text-foreground/60 mb-2">1pm</p>
          <p className="font-body text-base text-foreground/70 leading-relaxed">
            An intimate ceremony in the countryside.<br />
            Please arrive by 12:30.
          </p>
        </div>

        <div>
          <h4 className="font-display text-2xl text-foreground mb-1">Cocktail</h4>
          <p className="font-body text-base tracking-widest uppercase text-foreground/60 mb-2">2pm</p>
          <p className="font-body text-base text-foreground/70 leading-relaxed">
            Drinks, music and canapés served by the pool.
          </p>
        </div>

        <div>
          <h4 className="font-display text-2xl text-foreground mb-1">Late Lunch & Party</h4>
          <p className="font-body text-base tracking-widest uppercase text-foreground/60 mb-2">3:30pm</p>
          <p className="font-body text-base text-foreground/70 leading-relaxed">
            Lunch served while you can keep on dancing until late.
          </p>
        </div>

        <div className="bg-foreground/10 rounded-sm p-6">
          <h4 className="font-display text-2xl text-foreground mb-2">Dress Code</h4>
          <p className="font-body text-base text-foreground/70 leading-relaxed">
            Smart casual with a beach twist. Think linen, light fabrics, and comfortable shoes for sandy paths. Leave the stilettos at home!
          </p>
        </div>
      </div>
    </div>
  </section>
);

const Weekend = () => (
  <PageLayout>
    <WeekendSection />
  </PageLayout>
);

export default Weekend;
