import PageLayout from "@/components/PageLayout";
import ComportaMap from "@/components/ComportaMap";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export const StaySection = () => {
  const mapRef = useScrollReveal<HTMLDivElement>();

  return (
    <section id="stay" className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-12 text-center bg-[hsl(40_30%_95%)]">
      <p className="font-body text-base tracking-[0.3em] uppercase text-[hsl(220_50%_65%)]/60 mb-3">Where We'll Be</p>
      <h1 className="font-display text-5xl md:text-7xl font-light text-[hsl(220_50%_65%)] mb-4">Stay</h1>
      <p className="font-display text-xl text-[hsl(220_50%_65%)]/70 italic max-w-lg mb-10">
        The wedding will be at Monte da Várzea, nestled between the coast and the countryside. Here are some nearby areas to look for accommodation.
      </p>

      <div ref={mapRef} className="scroll-fade-up w-full max-w-xl">
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
