import PageLayout from "@/components/PageLayout";
import { Plane, Car } from "lucide-react";

export const TravelSection = () => (
  <section id="travel" className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-20 text-center bg-[hsl(235_45%_76%)]">
      <p className="font-body text-sm tracking-[0.3em] uppercase text-foreground/60 mb-4">Getting There</p>
      <h1 className="font-display text-5xl md:text-7xl font-light text-foreground mb-16">Travel</h1>

      <div className="max-w-2xl w-full space-y-10 animate-fade-in">
        <div className="bg-accent/50 rounded-sm p-8 text-left">
          <div className="flex items-center gap-3 mb-4">
            <Plane size={20} className="text-foreground/60" />
            <h3 className="font-display text-2xl text-foreground">By Air</h3>
          </div>
          <p className="font-body text-sm text-foreground/70 leading-relaxed">
            Fly into Lisbon Humberto Delgado Airport (LIS). From there, Comporta is about a 1.5-hour drive south. We recommend renting a car or arranging a transfer.
          </p>
        </div>

        <div className="bg-accent/50 rounded-sm p-8 text-left">
          <div className="flex items-center gap-3 mb-4">
            <Car size={20} className="text-foreground/60" />
            <h3 className="font-display text-2xl text-foreground">By Car</h3>
          </div>
          <p className="font-body text-sm text-foreground/70 leading-relaxed">
            From Lisbon, take the A2 motorway south and cross the Vasco da Gama bridge. Follow signs toward Alcácer do Sal and then Comporta. Parking will be available at the venue.
          </p>
        </div>

        <div className="bg-accent/50 rounded-sm p-8 text-left">
          <h3 className="font-display text-2xl text-foreground mb-4">Transfers</h3>
          <p className="font-body text-sm text-foreground/70 leading-relaxed">
            We'll be arranging group transfers from Lisbon on Friday afternoon and back on Sunday. More details to follow.
          </p>
        </div>
      </div>
    </section>
);

const Travel = () => (
  <PageLayout>
    <TravelSection />
  </PageLayout>
);

export default Travel;
