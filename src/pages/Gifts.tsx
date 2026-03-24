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
    </section>
  );
};

const Gifts = () => (
  <PageLayout>
    <GiftsSection />
  </PageLayout>
);

export default Gifts;
