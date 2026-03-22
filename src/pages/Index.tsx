import PageLayout from "@/components/PageLayout";
import { ChevronDown } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const illustrationFilter = "brightness(0) saturate(100%) invert(95%) sepia(5%) saturate(200%) hue-rotate(20deg) brightness(103%) contrast(95%)";

// Exported so SinglePage can embed it without an extra PageLayout wrapper.
export const HomeSection = () => {
  const photosRef = useScrollReveal<HTMLDivElement>(".story-photo");

  return (
    <div id="home">
      {/* Hero */}
      <section className="relative min-h-[100vh] flex items-center justify-center text-center px-4 overflow-hidden bg-[hsl(220_55%_75%)]">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10 pointer-events-none" />

        {/* Decorative illustrations */}
        <div className="absolute top-20 left-4 md:left-12 lg:left-20 w-12 md:w-16 lg:w-20 opacity-50">
          <img alt="" aria-hidden="true" role="presentation" src="/illustrations/big-ben.svg" className="w-full h-auto" style={{ filter: illustrationFilter }} />
        </div>
        <div className="absolute top-20 right-4 md:right-12 lg:right-20 w-16 md:w-20 lg:w-24 opacity-50">
          <img alt="" aria-hidden="true" role="presentation" src="/illustrations/flower-vase.svg" className="w-full h-auto" style={{ filter: illustrationFilter }} />
        </div>
        <div className="absolute top-12 md:top-16 left-1/2 -translate-x-1/2 w-20 md:w-28 lg:w-32 opacity-40 animate-float">
          <img alt="" aria-hidden="true" role="presentation" src="/illustrations/seagulls.svg" className="w-full h-auto" style={{ filter: illustrationFilter }} />
        </div>
        <div className="absolute top-1/3 left-2 md:left-8 lg:left-16 w-12 md:w-16 lg:w-20 opacity-40">
          <img alt="" aria-hidden="true" role="presentation" src="/illustrations/music-notes.svg" className="w-full h-auto" style={{ filter: illustrationFilter }} />
        </div>
        <div className="absolute top-1/3 right-2 md:right-8 lg:right-16 w-12 md:w-16 lg:w-20 opacity-50">
          <img alt="" aria-hidden="true" role="presentation" src="/illustrations/dancer.svg" className="w-full h-auto" style={{ filter: illustrationFilter }} />
        </div>
        <div className="absolute bottom-24 md:bottom-28 left-4 md:left-12 lg:left-20 w-14 md:w-18 lg:w-24 opacity-40">
          <img alt="" aria-hidden="true" role="presentation" src="/illustrations/cristo-redentor.svg" className="w-full h-auto" style={{ filter: illustrationFilter }} />
        </div>
        <div className="absolute bottom-20 md:bottom-24 left-1/4 w-16 md:w-20 lg:w-24 opacity-35">
          <img alt="" aria-hidden="true" role="presentation" src="/illustrations/amore.svg" className="w-full h-auto" style={{ filter: illustrationFilter }} />
        </div>
        <div className="absolute bottom-0 left-0 right-0 w-full opacity-35">
          <img alt="" aria-hidden="true" role="presentation" src="/illustrations/dunes.svg" className="w-full h-auto" style={{ filter: illustrationFilter }} />
        </div>
        <div className="absolute bottom-36 md:bottom-40 right-8 md:right-16 lg:right-24 w-8 md:w-10 lg:w-12 opacity-35 animate-float" style={{ animationDelay: "1.5s" }}>
          <img alt="" aria-hidden="true" role="presentation" src="/illustrations/heart.svg" className="w-full h-auto" style={{ filter: illustrationFilter }} />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.25)" }}>
          <p className="font-body text-xs md:text-sm tracking-[0.35em] uppercase text-foreground/90 mb-6 md:mb-8 animate-fade-in">
            Our Wedding
          </p>
          <h1 className="font-display font-light text-foreground text-4xl md:text-6xl lg:text-8xl tracking-wider mb-8 md:mb-10 leading-[1.1] uppercase animate-fade-in" style={{ animationDelay: "0.2s" }}>
            FILIPA & DUARTE
          </h1>
          <p className="text-foreground/85 text-base md:text-lg lg:text-xl max-w-lg mx-auto mb-12 md:mb-14 font-light leading-relaxed animate-fade-in" style={{ animationDelay: "0.4s" }}>
            A relaxed weekend by the beach — with plenty of music.
          </p>
          <div className="space-y-2 md:space-y-3 mb-12 md:mb-14 animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <p className="font-body text-base md:text-lg lg:text-xl tracking-widest font-light text-foreground/90">
              Comporta, Portugal
            </p>
            <p className="font-display text-xl md:text-2xl lg:text-3xl text-foreground tracking-wide">
              12 de Setembro de 2026
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 md:gap-5 justify-center animate-fade-in" style={{ animationDelay: "0.8s" }}>
            <a
              href="#rsvp"
              className="inline-flex items-center justify-center px-8 md:px-10 py-3 md:py-3.5 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 hover:shadow-md transition-all duration-300 text-sm md:text-base"
            >
              RSVP
            </a>
            <a
              href="#weekend"
              className="inline-flex items-center justify-center px-8 md:px-10 py-3 md:py-3.5 border-2 border-foreground/90 text-foreground font-medium rounded-md hover:bg-foreground/10 transition-all duration-300 text-sm md:text-base"
            >
              View Weekend
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 opacity-60 animate-fade-in" style={{ animationDelay: "1s" }}>
          <div className="flex flex-col items-center gap-2 text-foreground/70">
            <span className="text-xs uppercase tracking-[0.2em] font-body">Scroll</span>
            <ChevronDown className="w-4 h-4 md:w-5 md:h-5 animate-bounce" />
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 px-4 text-center bg-[hsl(220_50%_65%)]" style={{ textShadow: "0 1px 6px rgba(0,0,0,0.2)" }}>
        <p className="font-body text-base tracking-[0.3em] uppercase text-foreground/60 mb-6">
          Our Story
        </p>
        <p className="font-display text-3xl md:text-4xl text-foreground/90 max-w-2xl mx-auto italic leading-relaxed mb-12">
          What started with a chance meeting has grown into a love we want to celebrate with all of you — by the sea, under the stars.
        </p>

        {/* Couple photos */}
        <div ref={photosRef} className="flex flex-col md:flex-row gap-6 justify-center items-center max-w-3xl mx-auto">
          <div className="story-photo scroll-fade-up w-full md:w-1/2 aspect-[4/3] rounded-md overflow-hidden bg-foreground/10" style={{ transitionDelay: "0.1s" }}>
            <img
              src="/photos/couple-1.jpg"
              alt="Filipa and Duarte"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="story-photo scroll-fade-up w-full md:w-1/2 aspect-[4/3] rounded-md overflow-hidden bg-foreground/10" style={{ transitionDelay: "0.25s" }}>
            <img
              src="/photos/couple-2.jpg"
              alt="Filipa and Duarte"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

const Index = () => (
  <PageLayout>
    <HomeSection />
  </PageLayout>
);

export default Index;
