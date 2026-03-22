import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import { Heart } from "lucide-react";

export const GiftsSection = () => {
  const [showIban, setShowIban] = useState(false);

  return (
    <section id="gifts" className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-20 text-center bg-[hsl(220_55%_75%)]" style={{ textShadow: "0 1px 6px rgba(0,0,0,0.15)" }}>
      <p className="font-body text-base tracking-[0.3em] uppercase text-foreground/60 mb-4">Gifts</p>
      <h1 className="font-display text-4xl md:text-6xl font-light text-foreground mb-8">Your Presence Is Our Present</h1>

      <div className="max-w-lg space-y-8 animate-fade-in">
        <div className="flex justify-center">
          <Heart size={28} className="text-foreground/40" />
        </div>
        <p className="font-display text-2xl text-foreground/80 italic leading-relaxed">
          The best gift is to celebrate this day with the people we love most.
        </p>

        {showIban ? (
          <div className="bg-foreground/10 rounded-sm p-6 space-y-3">
            <p className="font-body text-sm tracking-widest uppercase text-foreground/50">Bank Details</p>
            {/* TODO: Replace with actual IBAN */}
            <p className="font-body text-lg text-foreground tracking-wide">
              PT50 0000 0000 0000 0000 0000 0
            </p>
            <p className="font-body text-sm text-foreground/50">Filipa & Duarte</p>
          </div>
        ) : (
          <button
            onClick={() => setShowIban(true)}
            className="inline-flex items-center justify-center px-8 py-3 border border-foreground/30 text-foreground/80 font-body text-base tracking-widest uppercase rounded-sm hover:bg-foreground/10 transition-colors"
          >
            Show Bank Details
          </button>
        )}
      </div>
    </section>
  );
};

const Gifts = () => (
  <PageLayout>
    <GiftsSection />
  </PageLayout>
);

export default Gifts;
