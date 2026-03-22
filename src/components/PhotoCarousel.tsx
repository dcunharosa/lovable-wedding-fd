import { useCallback, useEffect, useRef, useState } from "react";

const photos = Array.from({ length: 12 }, (_, i) => ({
  src: `/photos/couple/couple-${i + 1}.jpg`,
  alt: "Filipa and Duarte",
}));

// Duplicate the list so the strip can loop seamlessly.
const loopedPhotos = [...photos, ...photos];

const AUTO_SPEED = 0.8; // px per frame (~48 px/s at 60 fps)
const DRAG_RESUME_DELAY = 2000; // ms before auto-scroll resumes after manual drag

export default function PhotoCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const [paused, setPaused] = useState(false);

  // Drag state
  const dragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartOffset = useRef(0);
  const resumeTimer = useRef<ReturnType<typeof setTimeout>>();

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

  // Auto-scroll loop
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let raf: number;
    const step = () => {
      if (!paused && !dragging.current) {
        offsetRef.current = wrapOffset(offsetRef.current + AUTO_SPEED);
        track.style.transform = `translate3d(-${offsetRef.current}px, 0, 0)`;
      }
      raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [paused, wrapOffset]);

  // Pointer handlers for manual drag
  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    dragStartX.current = e.clientX;
    dragStartOffset.current = offsetRef.current;
    clearTimeout(resumeTimer.current);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    const delta = dragStartX.current - e.clientX;
    offsetRef.current = wrapOffset(dragStartOffset.current + delta);
    const track = trackRef.current;
    if (track) {
      track.style.transform = `translate3d(-${offsetRef.current}px, 0, 0)`;
    }
  };

  const onPointerUp = () => {
    if (!dragging.current) return;
    dragging.current = false;
    resumeTimer.current = setTimeout(() => {}, DRAG_RESUME_DELAY);
  };

  return (
    <div
      className="w-full overflow-hidden select-none cursor-grab active:cursor-grabbing"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => {
        setPaused(false);
        dragging.current = false;
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
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
              className="h-full w-auto object-cover pointer-events-none"
              loading={i < 12 ? "eager" : "lazy"}
              draggable={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
