const reduceMotionLegal = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let legalInitialized = false;

function initLegalScrollReveal() {
  const revealItems = document.querySelectorAll(".legal-reveal");

  if (!revealItems.length) {
    return;
  }

  if (reduceMotionLegal) {
    gsap.set(revealItems, { opacity: 1, y: 0, filter: "none" });
    return;
  }

  gsap.set(revealItems, { opacity: 0, y: 24, filter: "blur(7px)" });

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
            duration: 0.78,
            ease: "power2.out",
          });
          return;
        }

        gsap.killTweensOf(target);
        gsap.to(target, {
          opacity: 0,
          y: 12,
          filter: "blur(5px)",
          duration: 0.35,
          ease: "power1.out",
        });
      });
    },
    { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
  );

  revealItems.forEach((item) => observer.observe(item));
}

function initLegalPage() {
  if (legalInitialized) {
    return;
  }
  legalInitialized = true;

  if (reduceMotionLegal) {
    gsap.set(".main-nav .nav-link", { opacity: 1, y: 0, clearProps: "transform" });
    gsap.set(".legal-main", { autoAlpha: 1 });
    gsap.set([".legal-title", ".legal-updated", ".legal-content"], {
      opacity: 1,
      y: 0,
      clearProps: "transform",
    });
    initLegalScrollReveal();
    return;
  }

  gsap.timeline({ defaults: { ease: "power3.out" } })
    .fromTo(
      ".main-nav .nav-link",
      { opacity: 0, y: -16 },
      {
        opacity: 1,
        y: 0,
        duration: 0.45,
        stagger: 0.04,
      },
      0
    )
    .to(
      ".legal-main",
      {
        autoAlpha: 1,
        duration: 0.01,
      },
      0
    )
    .from(
      ".legal-title",
      {
        opacity: 0,
        y: 18,
        duration: 0.56,
      },
      0.08
    )
    .from(
      ".legal-updated",
      {
        opacity: 0,
        y: 12,
        duration: 0.4,
      },
      0.2
    )
    .from(
      ".legal-content",
      {
        opacity: 0,
        y: 16,
        duration: 0.5,
      },
      0.28
    );

  initLegalScrollReveal();
}

function initLegalWhenReady() {
  if (document.documentElement.dataset.pageEnterReady === "true") {
    initLegalPage();
  } else {
    document.addEventListener("page:enter-ready", initLegalPage, { once: true });
  }
}

if (document.documentElement.dataset.componentsReady === "true") {
  initLegalWhenReady();
} else {
  document.addEventListener("components:ready", initLegalWhenReady, { once: true });
}
