import PageLayout from "@/components/PageLayout";
import { MapPin } from "lucide-react";

export const VenueSection = () => (
  <section id="venue" className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-20 text-center bg-[hsl(195_45%_70%)]">
      <p className="font-body text-sm tracking-[0.3em] uppercase text-foreground/60 mb-4">Where It Happens</p>
      <h1 className="font-display text-5xl md:text-7xl font-light text-foreground mb-8">The Venue</h1>

      <div className="max-w-2xl space-y-8 animate-fade-in">
        <div className="flex items-center justify-center gap-2 text-foreground/70">
          <MapPin size={18} />
          <p className="font-body text-sm tracking-widest uppercase">Comporta, Portugal</p>
        </div>

        <p className="font-display text-xl text-foreground/80 italic leading-relaxed">
          Nestled between golden rice paddies and the Atlantic Ocean, Comporta is one of Portugal's most beautiful and unspoiled coastal retreats.
        </p>

        <div className="bg-accent/50 rounded-sm p-8 mt-8">
          <h3 className="font-display text-2xl text-foreground mb-4">Ceremony & Reception</h3>
          <p className="font-body text-sm text-foreground/70 leading-relaxed mb-4">
            The ceremony will take place at the dunes with a view of the sea. The reception follows in an open-air setting surrounded by nature.
          </p>
          <p className="font-body text-xs tracking-widest uppercase text-foreground/50">
            Full address will be shared closer to the date
          </p>
        </div>

        <div className="bg-accent/50 rounded-sm p-8">
          <h3 className="font-display text-2xl text-foreground mb-4">Dress Code</h3>
          <p className="font-body text-sm text-foreground/70 leading-relaxed">
            Smart casual with a beach twist. Think linen, light fabrics, and comfortable shoes for sandy paths. Leave the stilettos at home!
          </p>
        </div>
      </div>
    </section>
);

const Venue = () => (
  <PageLayout>
    <VenueSection />
  </PageLayout>
);

export default Venue;
