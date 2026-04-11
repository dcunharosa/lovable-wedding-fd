import { useState, useEffect, useCallback, useRef } from "react";
import PageLayout from "@/components/PageLayout";
import { MapPin, ExternalLink, X } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useTranslation } from "@/i18n";

function Lightbox({
  src,
  alt,
  closeLabel,
  onClose,
}: {
  src: string;
  alt: string;
  closeLabel: string;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    // Save the element that opened the lightbox so we can restore focus later.
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [handleKeyDown]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
      onClick={onClose}
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        className="absolute top-6 right-6 text-white/80 hover:text-white"
        aria-label={closeLabel}
      >
        <X size={32} />
      </button>
      <img
        src={src}
        alt={alt}
        className="max-w-[90vw] max-h-[90vh] object-contain rounded-md"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}

export const VenueSection = () => {
  const { t } = useTranslation();
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const cardsRef = useScrollReveal<HTMLDivElement>(".venue-card");

  const venuePhotos = [
    { src: "/venue/venue-1.jpg", alt: t.venue.venueImgAlt },
    { src: "/venue/venue-2.jpg", alt: t.venue.venueImgAlt },
  ];

  return (
    <section id="venue" className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-20 text-center bg-[hsl(220_50%_65%)]" style={{ textShadow: "0 1px 6px rgba(0,0,0,0.15)" }}>
      <p className="font-body text-base tracking-[0.3em] uppercase text-foreground/60 mb-4">{t.venue.whereItHappens}</p>
      <h1 className="font-display text-5xl md:text-7xl font-light text-foreground mb-8">{t.venue.theVenue}</h1>

      <div className="max-w-4xl animate-fade-in">
        <a
          href="https://maps.google.com/?q=Comporta,Portugal"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 text-foreground/70 hover:text-foreground/90 transition-colors"
        >
          <MapPin size={18} />
          <p className="font-body text-base tracking-widest uppercase">{t.venue.locationLabel}</p>
        </a>
      </div>

      {/* Venue photos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 w-full max-w-[90vw]">
        {venuePhotos.map((photo) => (
          <button
            key={photo.src}
            type="button"
            onClick={() => setLightboxSrc(photo.src)}
            className="aspect-[4/3] rounded-md overflow-hidden bg-foreground/10 cursor-pointer transition-transform duration-300 hover:scale-[1.03]"
          >
            <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover" loading="lazy" />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxSrc && (
        <Lightbox
          src={lightboxSrc}
          alt={t.venue.venuePhotoAlt}
          closeLabel={t.venue.closeLightbox}
          onClose={() => setLightboxSrc(null)}
        />
      )}

      <div ref={cardsRef} className="max-w-4xl space-y-8 mt-8">
        <div className="venue-card scroll-scale-in bg-gradient-to-br from-foreground/10 to-foreground/5 rounded-lg p-8 border border-foreground/10">
          <h3 className="font-display text-3xl text-foreground mb-4">{t.venue.ceremonyReception}</h3>
          <p className="font-body text-base text-foreground/70 leading-relaxed mb-6">
            {t.venue.venueDesc}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://maps.app.goo.gl/RB7pQqUN3CEwZDsX7"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 border border-foreground/30 text-foreground/80 font-body text-sm tracking-widest uppercase rounded-sm hover:bg-foreground/10 transition-colors"
            >
              <ExternalLink size={14} />
              {t.venue.googleMaps}
            </a>
            <a
              href="https://maps.app.goo.gl/nAtXArjfvt5Dsu31A"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 border border-foreground/30 text-foreground/80 font-body text-sm tracking-widest uppercase rounded-sm hover:bg-foreground/10 transition-colors"
            >
              <ExternalLink size={14} />
              {t.venue.directionsPdf}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const Venue = () => (
  <PageLayout>
    <VenueSection />
  </PageLayout>
);

export default Venue;
