import { useState, useEffect } from "react";

/**
 * Tracks which section (by id) is currently visible in the viewport centre.
 * Only activates when `enabled` is true — pass false on sub-pages to skip
 * the observer entirely.
 */
export function useActiveSection(ids: string[], enabled: boolean): string {
  const [active, setActive] = useState(ids[0] ?? "");
  const idsKey = ids.join(",");

  useEffect(() => {
    if (!enabled || ids.length === 0) return;

    // Fires when the vertical midpoint of the viewport enters a section.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idsKey, enabled]);

  return active;
}
