const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let homeInitialized = false;

function initHomePage() {
  if (homeInitialized) {
    return;
  }
  homeInitialized = true;

  const preloader = document.querySelector(".preloader");
  const site = document.querySelector(".site");
  const counterElement = document.querySelector(".preload-percent");
  const preloadLogo = document.querySelector(".preload-logo");
  const preloadLeft = document.querySelector(".preload-left");
  const preloadRight = document.querySelector(".preload-right");

  if (!preloader || !site || !counterElement || !preloadLogo || !preloadLeft || !preloadRight) {
    return;
  }

  function revealSite() {
    document.body.style.overflow = "auto";

    gsap.timeline({ defaults: { ease: "power3.out" } })
      .to(".site", {
        autoAlpha: 1,
        duration: 0.01,
      })
      .from(
        ".main-nav .nav-link",
        {
          opacity: 0,
          y: -20,
          duration: 0.6,
          stagger: 0.06,
        },
        "<"
      )
      .from(
        ".hero .brand-image",
        {
          opacity: 0,
          yPercent: 16,
          filter: "blur(8px)",
          duration: 1.05,
        },
        "-=0.25"
      )
      .from(
        ".location",
        {
          opacity: 0,
          y: 18,
          duration: 0.55,
        },
        "-=0.45"
      );
  }

  function setupSideTextPositions() {
    const logoRect = preloadLogo.getBoundingClientRect();
    const leftRect = preloadLeft.getBoundingClientRect();
    const rightRect = preloadRight.getBoundingClientRect();
    const viewportHalf = window.innerWidth / 2;
    const gap = Math.max(16, window.innerWidth * 0.01);
    const edgePadding = Math.max(24, window.innerWidth * 0.03);

    const leftStart = -(logoRect.width / 2) - leftRect.width - gap;
    const rightStart = logoRect.width / 2 + gap;
    const leftEnd = edgePadding - viewportHalf;
    const rightEnd = viewportHalf - rightRect.width - edgePadding;

    gsap.set(preloadLeft, { x: leftStart });
    gsap.set(preloadRight, { x: rightStart });

    return { leftEnd, rightEnd };
  }

  window.addEventListener("resize", () => {
    if (prefersReducedMotion || !preloader) {
      return;
    }

    if (getComputedStyle(preloader).display !== "none") {
      setupSideTextPositions();
    }
  });

  if (prefersReducedMotion) {
    counterElement.textContent = "|100%|";
    gsap.set(preloader, { autoAlpha: 0, display: "none" });
    gsap.set(site, { autoAlpha: 1, visibility: "visible" });
    document.body.style.overflow = "auto";
    return;
  }

  const counter = { value: 0 };
  const sideTargets = setupSideTextPositions();

  gsap.timeline({ defaults: { ease: "power3.out" } })
    .from(".preload-logo", {
      opacity: 0,
      y: 26,
      duration: 0.8,
    })
    .from(
      ".preload-side",
      {
        opacity: 0,
        y: 12,
        duration: 0.55,
        stagger: 0.08,
      },
      "-=0.4"
    )
    .to(counter, {
      value: 100,
      duration: 2.25,
      ease: "none",
      onUpdate: () => {
        counterElement.textContent = `|${Math.round(counter.value)}%|`;
      },
    })
    .to(
      preloadLeft,
      {
        x: sideTargets.leftEnd,
        duration: 2.25,
        ease: "none",
      },
      "<"
    )
    .to(
      preloadRight,
      {
        x: sideTargets.rightEnd,
        duration: 2.25,
        ease: "none",
      },
      "<"
    )
    .to(".preload-center", {
      y: -14,
      opacity: 0,
      duration: 0.35,
    })
    .to(
      ".preload-side",
      {
        opacity: 0,
        y: -10,
        duration: 0.35,
      },
      "<"
    )
    .to(preloader, {
      autoAlpha: 0,
      duration: 0.55,
      onComplete: () => {
        gsap.set(preloader, { display: "none" });
        revealSite();
      },
    });
}

if (document.documentElement.dataset.componentsReady === "true") {
  initHomePage();
} else {
  document.addEventListener("components:ready", initHomePage, { once: true });
}
