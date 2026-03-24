import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import { useTranslation } from "@/i18n";

export const GiftsSection = () => {
  const { t } = useTranslation();
  const [showIban, setShowIban] = useState(false);

  return (
    <section id="gifts" className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-20 text-center bg-[hsl(220_55%_75%)]" style={{ textShadow: "0 1px 6px rgba(0,0,0,0.15)" }}>
      <p className="font-body text-base tracking-[0.3em] uppercase text-foreground/60 mb-4">{t.gifts.gifts}</p>
      <h1 className="font-display text-4xl md:text-6xl font-light text-foreground mb-8">{t.gifts.title}</h1>

      <div className="max-w-lg space-y-8 animate-fade-in">
        <p className="font-display text-2xl text-foreground/80 italic leading-relaxed">
          {t.gifts.subtitle}
        </p>

        {showIban ? (
          <div className="animate-scale-in bg-gradient-to-br from-foreground/10 to-foreground/5 rounded-lg p-6 border border-foreground/10 space-y-3">
            <p className="font-body text-sm tracking-widest uppercase text-foreground/50">{t.gifts.bankDetails}</p>
            {/* TODO: Replace with actual IBAN */}
            <p className="font-body text-lg text-foreground tracking-wide">
              PT50 0000 0000 0000 0000 0000 0
            </p>
            <p className="font-body text-sm text-foreground/50">{t.gifts.bankHolder}</p>
          </div>
        ) : (
          <button
            onClick={() => setShowIban(true)}
            className="inline-flex items-center justify-center px-8 py-3 border border-foreground/30 text-foreground/80 font-body text-base tracking-widest uppercase rounded-sm hover:bg-foreground/10 transition-colors"
          >
            {t.gifts.showBankDetails}
          </button>
        )}
      </div>

      {/* Honeymoon & Home photos */}
      <div className="mt-16 max-w-4xl w-full">
        <p className="font-body text-sm tracking-[0.2em] uppercase text-foreground/50 mb-6">
          {t.gifts.photoCaption}
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <img
            src="https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=600&q=80&auto=format&fit=crop"
            alt="New Zealand — Milford Sound"
            className="w-full h-48 object-cover rounded-lg opacity-80"
          />
          <img
            src="https://images.unsplash.com/photo-1508193638397-1c4234db14d7?w=600&q=80&auto=format&fit=crop"
            alt="New Zealand — mountains and lake"
            className="w-full h-48 object-cover rounded-lg opacity-80"
          />
          <img
            src="https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=600&q=80&auto=format&fit=crop"
            alt="Australia — Sydney Opera House"
            className="w-full h-48 object-cover rounded-lg opacity-80"
          />
          <img
            src="https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=600&q=80&auto=format&fit=crop"
            alt="Australia — coastline"
            className="w-full h-48 object-cover rounded-lg opacity-80"
          />
          <img
            src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80&auto=format&fit=crop"
            alt="Modern furniture — sofa"
            className="w-full h-48 object-cover rounded-lg opacity-80"
          />
          <img
            src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&q=80&auto=format&fit=crop"
            alt="Minimalist interior design"
            className="w-full h-48 object-cover rounded-lg opacity-80"
          />
        </div>
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
