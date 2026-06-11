import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const useGsapAnimations = () => {
  useEffect(() => {
    const ctx = gsap.context(() => {

      /* ── 1. Hero entrance — stagger each child ── */
      const heroItems = gsap.utils.toArray<HTMLElement>('[data-hero-item]');
      if (heroItems.length) {
        gsap.from(heroItems, {
          opacity: 0,
          y: 40,
          duration: 0.9,
          stagger: 0.18,
          ease: 'power3.out',
          delay: 0.15,
          clearProps: 'all',
        });
      }

      /* ── 2. Section titles — fade + slide up ── */
      gsap.utils.toArray<HTMLElement>('[data-gsap-title]').forEach((el) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
          opacity: 0,
          y: 50,
          duration: 0.9,
          ease: 'power3.out',
          clearProps: 'all',
        });
      });

      /* ── 3. Section subtitles / paragraphs ── */
      gsap.utils.toArray<HTMLElement>('[data-gsap-subtitle]').forEach((el) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: 'power2.out',
          delay: 0.15,
          clearProps: 'all',
        });
      });

      /* ── 4. Ceremony cards — stagger scale + fade ── */
      const ceremonyCards = gsap.utils.toArray<HTMLElement>('[data-gsap-card]');
      if (ceremonyCards.length) {
        gsap.from(ceremonyCards, {
          scrollTrigger: {
            trigger: ceremonyCards[0],
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          opacity: 0,
          y: 50,
          scale: 0.94,
          duration: 0.8,
          stagger: 0.15,
          ease: 'back.out(1.4)',
          clearProps: 'all',
        });
      }

      /* ── 5. Gold decorative line in hero ── */
      const heroLine = document.querySelector<HTMLElement>('[data-hero-line]');
      if (heroLine) {
        gsap.from(heroLine, {
          scaleX: 0,
          duration: 1,
          ease: 'power2.inOut',
          delay: 0.6,
          transformOrigin: 'center',
          clearProps: 'all',
        });
      }

      /* ── 6. Gift section header ── */
      const giftHeader = gsap.utils.toArray<HTMLElement>('[data-gsap-gift-header] > *');
      if (giftHeader.length) {
        gsap.from(giftHeader, {
          scrollTrigger: {
            trigger: '[data-gsap-gift-header]',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          opacity: 0,
          y: 40,
          duration: 0.75,
          stagger: 0.12,
          ease: 'power3.out',
          clearProps: 'all',
        });
      }

      /* ── 7. RSVP section ── */
      const rsvpContent = document.querySelector<HTMLElement>('[data-gsap-rsvp]');
      if (rsvpContent) {
        gsap.from(rsvpContent, {
          scrollTrigger: {
            trigger: rsvpContent,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          opacity: 0,
          y: 50,
          duration: 1,
          ease: 'power3.out',
          clearProps: 'all',
        });
      }

      /* ── 8. Footer ── */
      const footer = document.querySelector<HTMLElement>('[data-gsap-footer]');
      if (footer) {
        gsap.from(footer, {
          scrollTrigger: {
            trigger: footer,
            start: 'top 92%',
            toggleActions: 'play none none none',
          },
          opacity: 0,
          y: 30,
          duration: 0.9,
          ease: 'power2.out',
          clearProps: 'all',
        });
      }

      /* ── 9. Location section ── */
      const mapBox = document.querySelector<HTMLElement>('[data-gsap-map]');
      if (mapBox) {
        gsap.from(mapBox, {
          scrollTrigger: {
            trigger: mapBox,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          opacity: 0,
          scale: 0.97,
          duration: 1,
          ease: 'power2.out',
          clearProps: 'all',
        });
      }

      /* ── 10. Floating parallax on hero background blobs ── */
      gsap.utils.toArray<HTMLElement>('[data-hero-blob]').forEach((blob, i) => {
        gsap.to(blob, {
          y: i % 2 === 0 ? -30 : 30,
          x: i % 2 === 0 ? 20 : -20,
          duration: 4 + i,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });

    });

    return () => ctx.revert();
  }, []);
};

export default useGsapAnimations;
