let footerInitialized = false;

function initFooterReveal() {
  if (footerInitialized) {
    return;
  }
  footerInitialized = true;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const footerRevealItems = document.querySelectorAll(".footer-reveal");

  if (!footerRevealItems.length) {
    return;
  }

  if (reduceMotion) {
    gsap.set(footerRevealItems, { opacity: 1, y: 0, filter: "none" });
    return;
  }

  gsap.set(footerRevealItems, { opacity: 0, y: 28, filter: "blur(8px)" });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const target = entry.target;

        if (entry.isIntersecting) {
          gsap.killTweensOf(target);
          gsap.to(target, {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.95,
            ease: "power2.out",
          });
          return;
        }

        gsap.killTweensOf(target);
        gsap.to(target, {
          opacity: 0,
          y: 18,
          filter: "blur(6px)",
          duration: 0.45,
          ease: "power1.out",
        });
      });
    },
    { threshold: 0.2, rootMargin: "0px 0px -6% 0px" }
  );

  footerRevealItems.forEach((item) => observer.observe(item));
}

if (document.documentElement.dataset.componentsReady === "true") {
  initFooterReveal();
} else {
  document.addEventListener("components:ready", initFooterReveal, { once: true });
}
