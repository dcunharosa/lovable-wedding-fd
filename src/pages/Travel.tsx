import PageLayout from "@/components/PageLayout";
import { Plane, Car } from "lucide-react";

const dark = "hsl(220 30% 20%)";

export const TravelSection = () => (
  <section id="travel" className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-20 text-center bg-[#fff6c5]">
      <p className="font-body text-sm tracking-[0.3em] uppercase mb-4" style={{ color: `${dark}80` }}>Getting There</p>
      <h1 className="font-display text-5xl md:text-7xl font-light mb-16" style={{ color: dark }}>Travel</h1>

      <div className="max-w-2xl w-full space-y-10 animate-fade-in">
        <div className="rounded-sm p-8 text-left" style={{ backgroundColor: `${dark}08` }}>
          <div className="flex items-center gap-3 mb-4">
            <Plane size={20} style={{ color: `${dark}99` }} />
            <h3 className="font-display text-2xl" style={{ color: dark }}>By Air</h3>
          </div>
          <p className="font-body text-sm leading-relaxed" style={{ color: `${dark}b3` }}>
            Fly into Lisbon Humberto Delgado Airport (LIS). From there, Comporta is about a 1.5-hour drive south. We recommend renting a car or arranging a transfer.
          </p>
        </div>

        <div className="rounded-sm p-8 text-left" style={{ backgroundColor: `${dark}08` }}>
          <div className="flex items-center gap-3 mb-4">
            <Car size={20} style={{ color: `${dark}99` }} />
            <h3 className="font-display text-2xl" style={{ color: dark }}>By Car</h3>
          </div>
          <p className="font-body text-sm leading-relaxed" style={{ color: `${dark}b3` }}>
            From Lisbon, take the A2 motorway south and cross the Vasco da Gama bridge. Follow signs toward Alcácer do Sal and then Comporta. Parking will be available at the venue.
          </p>
        </div>

        <div className="rounded-sm p-8 text-left" style={{ backgroundColor: `${dark}08` }}>
          <h3 className="font-display text-2xl mb-4" style={{ color: dark }}>Transfers</h3>
          <p className="font-body text-sm leading-relaxed" style={{ color: `${dark}b3` }}>
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
