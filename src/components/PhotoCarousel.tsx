import { useEffect, useRef, useState } from "react";

const photos = Array.from({ length: 12 }, (_, i) => ({
  src: `/photos/couple/couple-${i + 1}.jpg`,
  alt: "Filipa and Duarte",
}));

// Duplicate the list so the strip can loop seamlessly.
const loopedPhotos = [...photos, ...photos];

export default function PhotoCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let raf: number;
    let offset = 0;
    // Half-way point: when we've scrolled past the first set, reset.
    const halfWidth = track.scrollWidth / 2;
    const speed = 0.35; // px per frame (~21 px/s at 60 fps)

    const step = () => {
      if (!paused) {
        offset += speed;
        if (offset >= halfWidth) offset -= halfWidth;
        track.style.transform = `translate3d(-${offset}px, 0, 0)`;
      }
      raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [paused]);

  return (
    <div
      className="w-full overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div ref={trackRef} className="flex gap-5 will-change-transform">
        {loopedPhotos.map((photo, i) => (
          <div
            key={i}
            className="flex-shrink-0 h-64 md:h-80 rounded-lg overflow-hidden"
          >
            <img
              src={photo.src}
              alt={photo.alt}
              className="h-full w-auto object-cover"
              loading={i < 12 ? "eager" : "lazy"}
              draggable={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
