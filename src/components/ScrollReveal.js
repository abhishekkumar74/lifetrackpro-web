'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const elements = document.querySelectorAll('.reveal');
    if (!elements.length) return;

    // Immediately reveal on mobile / small devices or if IntersectionObserver is unsupported
    if (typeof window !== 'undefined' && (window.innerWidth <= 768 || !('IntersectionObserver' in window))) {
      elements.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    let observer = null;
    try {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.05,
          rootMargin: '60px 0px 60px 0px'
        }
      );

      elements.forEach((el) => {
        if (!el.classList.contains('is-visible')) {
          observer.observe(el);
        }
      });
    } catch {
      // Fallback: reveal everything safely
      elements.forEach((el) => el.classList.add('is-visible'));
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [pathname]);

  return null;
}

