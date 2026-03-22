import { useEffect, useRef } from "react";

/**
 * Observes the target element (or its children matching `childSelector`)
 * and adds a "scroll-visible" class when they enter the viewport.
 * Each element is only animated once (unobserved after reveal).
 */
export function useScrollReveal<T extends HTMLElement>(
  childSelector?: string,
  options?: { threshold?: number; rootMargin?: string }
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = childSelector
      ? Array.from(el.querySelectorAll(childSelector))
      : [el];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("scroll-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: options?.threshold ?? 0.15,
        rootMargin: options?.rootMargin ?? "0px 0px -50px 0px",
      }
    );

    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [childSelector, options?.threshold, options?.rootMargin]);

  return ref;
}
