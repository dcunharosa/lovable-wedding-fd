import PageLayout from "@/components/PageLayout";
import PhotoCarousel from "@/components/PhotoCarousel";
import { ChevronDown } from "lucide-react";

const illustrationFilter = "brightness(0) saturate(100%) invert(95%) sepia(5%) saturate(200%) hue-rotate(20deg) brightness(103%) contrast(95%)";

// Exported so SinglePage can embed it without an extra PageLayout wrapper.
export const HomeSection = () => {
  return (
    <div id="home">
      {/* Hero */}
      <section className="relative min-h-[100vh] flex items-center justify-center px-4 sm:px-8 lg:px-16 overflow-hidden bg-[hsl(220_55%_75%)]">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10 pointer-events-none" />

        {/* Decorative hand-drawn illustrations */}
        {/* Big Ben: left of the photo */}
        <div className="absolute bottom-[20%] left-4 md:left-12 lg:left-[47%] w-12 md:w-16 lg:w-20 opacity-50">
          <img alt="" aria-hidden="true" role="presentation" src="/illustrations/big-ben.png" className="w-full h-auto" style={{ filter: illustrationFilter }} />
        </div>
        {/* Top: Single Flower */}
        <div className="absolute top-[6%] left-[40%] lg:left-[42%] w-12 md:w-16 lg:w-20 opacity-50">
          <img alt="" aria-hidden="true" role="presentation" src="/illustrations/single-flower.png" className="w-full h-auto" style={{ filter: illustrationFilter }} />
        </div>
        {/* Top: Seagulls (floating, moved left) */}
        <div className="absolute top-12 md:top-16 left-[24%] lg:left-[26%] w-20 md:w-28 lg:w-32 opacity-40 animate-float">
          <img alt="" aria-hidden="true" role="presentation" src="/illustrations/seagulls.png" className="w-full h-auto" style={{ filter: illustrationFilter }} />
        </div>
        {/* Top-left zone: Music Notes */}
        <div className="absolute top-[8%] left-[10%] lg:left-[14%] w-10 md:w-14 lg:w-16 opacity-40">
          <img alt="" aria-hidden="true" role="presentation" src="/illustrations/music-notes.png" className="w-full h-auto" style={{ filter: illustrationFilter }} />
        </div>
        {/* Right-mid: Dancer — hidden on small screens to avoid photo overlap */}
        <div className="absolute top-[35%] right-2 md:right-4 lg:right-8 w-10 md:w-14 lg:w-16 opacity-40 hidden md:block">
          <img alt="" aria-hidden="true" role="presentation" src="/illustrations/dancer.png" className="w-full h-auto" style={{ filter: illustrationFilter }} />
        </div>
        {/* Top-right zone: Flower Vase (above photo) */}
        <div className="absolute top-[5%] left-[60%] lg:left-[62%] w-12 md:w-16 lg:w-20 opacity-40">
          <img alt="" aria-hidden="true" role="presentation" src="/illustrations/flower-vase.png" className="w-full h-auto" style={{ filter: illustrationFilter }} />
        </div>
        {/* Amore: on top of the photo, larger */}
        <div className="absolute top-[5%] right-[8%] lg:right-[12%] w-20 md:w-28 lg:w-32 opacity-40">
          <img alt="" aria-hidden="true" role="presentation" src="/illustrations/amore.png" className="w-full h-auto" style={{ filter: illustrationFilter }} />
        </div>
        {/* Bottom-right: Dunes */}
        <div className="absolute bottom-16 md:bottom-20 right-4 md:right-12 lg:right-16 w-16 md:w-24 lg:w-28 opacity-30">
          <img alt="" aria-hidden="true" role="presentation" src="/illustrations/dunes.png" className="w-full h-auto" style={{ filter: illustrationFilter }} />
        </div>
        {/* Center zone: Heart (between title and photo) */}
        <div className="absolute top-[35%] left-[30%] lg:left-[34%] w-8 md:w-10 lg:w-12 opacity-35 animate-float" style={{ animationDelay: "1.5s" }}>
          <img alt="" aria-hidden="true" role="presentation" src="/illustrations/heart.png" className="w-full h-auto" style={{ filter: illustrationFilter }} />
        </div>

        {/* Split-layout content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center pt-24 pb-20 lg:pt-0 lg:pb-0">
          {/* Left column: Text */}
          <div className="text-center lg:text-left" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.25)" }}>
            <p className="font-body text-xs md:text-sm tracking-[0.35em] uppercase text-foreground/90 mb-6 md:mb-8 animate-fade-in">
              Our Wedding
            </p>
            <h1 className="font-display font-light text-foreground text-4xl md:text-6xl lg:text-7xl tracking-wider mb-8 md:mb-10 leading-[1.1] uppercase animate-fade-in" style={{ animationDelay: "0.2s" }}>
              FILIPA & DUARTE
            </h1>
            <p className="text-foreground/85 text-base md:text-lg lg:text-xl max-w-lg mx-auto lg:mx-0 mb-12 md:mb-14 font-light leading-relaxed animate-fade-in" style={{ animationDelay: "0.4s" }}>
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
            <div className="flex flex-col sm:flex-row gap-4 md:gap-5 justify-center lg:justify-start animate-fade-in" style={{ animationDelay: "0.8s" }}>
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

          {/* Right column: Couple photo */}
          <div className="flex justify-center lg:justify-end animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="relative">
              <div className="absolute -inset-3 rounded-2xl border-2 border-foreground/15 -rotate-2 hidden lg:block" />
              <img
                src="/hero-couple.jpg"
                alt="Filipa and Duarte sharing a kiss"
                className="relative rounded-xl shadow-2xl w-72 sm:w-80 md:w-96 lg:w-[420px] xl:w-[480px] h-auto object-cover rotate-1 lg:rotate-2 hover:rotate-0 transition-transform duration-500"
              />
            </div>
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
      <section className="py-20 text-center bg-[hsl(220_50%_65%)] overflow-hidden" style={{ textShadow: "0 1px 6px rgba(0,0,0,0.2)" }}>
        <p className="font-body text-base tracking-[0.3em] uppercase text-foreground/60 mb-6 px-4">
          Our Story
        </p>
        <p className="font-display text-3xl md:text-4xl text-foreground/90 max-w-2xl mx-auto italic leading-relaxed mb-12 px-4">
          A random sunday night out in December 2022 took us to London, back to Portugal, around Brazil a few times, all the way across Spain to fetch Mico and finally to this special day, where you'll bear witness to an unforgettable new moment in our lives.
        </p>

        {/* Couple photos carousel */}
        <PhotoCarousel />
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
