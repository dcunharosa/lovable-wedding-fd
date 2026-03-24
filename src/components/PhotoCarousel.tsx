import { useCallback, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "@/i18n";

const photoSrcs = Array.from({ length: 15 }, (_, i) => `/photos/couple/couple-${i + 1}.jpg`);

// Duplicate the list so the strip can loop seamlessly.
const loopedSrcs = [...photoSrcs, ...photoSrcs];

const AUTO_SPEED = 0.8; // px per frame (~48 px/s at 60 fps)
const NUDGE_PX = 320; // how far an arrow click jumps

export default function PhotoCarousel() {
  const { t } = useTranslation();
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const pausedRef = useRef(false);

  const getHalfWidth = useCallback(() => {
    const track = trackRef.current;
    return track ? track.scrollWidth / 2 : 0;
  }, []);

  const wrapOffset = useCallback(
    (val: number) => {
      const half = getHalfWidth();
      if (half === 0) return val;
      return ((val % half) + half) % half;
    },
    [getHalfWidth],
  );

  const applyOffset = useCallback(
    (val: number) => {
      offsetRef.current = wrapOffset(val);
      const track = trackRef.current;
      if (track) {
        track.style.transform = `translate3d(-${offsetRef.current}px, 0, 0)`;
      }
    },
    [wrapOffset],
  );

  // Auto-scroll loop
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let raf: number;
    const step = () => {
      if (!pausedRef.current) {
        applyOffset(offsetRef.current + AUTO_SPEED);
      }
      raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [applyOffset]);

  const nudge = (direction: 1 | -1) => {
    applyOffset(offsetRef.current + direction * NUDGE_PX);
  };

  return (
    <div
      className="relative w-full group"
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
    >
      {/* Arrow buttons — visible on hover */}
      <button
        type="button"
        aria-label={t.home.previousPhotos}
        onClick={() => nudge(-1)}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        type="button"
        aria-label={t.home.nextPhotos}
        onClick={() => nudge(1)}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      <div className="overflow-hidden">
        <div ref={trackRef} className="flex gap-5 will-change-transform">
          {loopedSrcs.map((src, i) => (
            <div
              key={i}
              className="flex-shrink-0 h-64 md:h-80 rounded-lg overflow-hidden"
            >
              <img
                src={src}
                alt={t.home.photoAlt}
                className="h-full w-auto object-cover"
                loading={i < 15 ? "eager" : "lazy"}
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
