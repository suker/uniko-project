let transitionInitialized = false;

function initPageTransition() {
  if (transitionInitialized) {
    return;
  }
  transitionInitialized = true;

  const transitionLinks = document.querySelectorAll("a[data-transition-link]");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let transitionOverlay = document.querySelector(".page-transition-overlay");
  if (!transitionOverlay) {
    transitionOverlay = document.createElement("div");
    transitionOverlay.className = "page-transition-overlay";
    document.body.appendChild(transitionOverlay);
  }

  if (!reducedMotion && document.body.dataset.page !== "home") {
    gsap.fromTo(
      transitionOverlay,
      { scaleY: 1 },
      {
        scaleY: 0,
        transformOrigin: "top",
        duration: 0.7,
        ease: "power3.inOut",
        onComplete: () => {
          document.documentElement.dataset.pageEnterReady = "true";
          document.dispatchEvent(new CustomEvent("page:enter-ready"));
        },
      }
    );
  } else {
    gsap.set(transitionOverlay, { scaleY: 0, transformOrigin: "top" });
    document.documentElement.dataset.pageEnterReady = "true";
    document.dispatchEvent(new CustomEvent("page:enter-ready"));
  }

  transitionLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");

      if (!href || href.startsWith("#") || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      event.preventDefault();

      if (reducedMotion) {
        window.location.href = href;
        return;
      }

      gsap.timeline({ defaults: { ease: "power3.inOut" } })
        .to("main", {
          opacity: 0,
          y: -14,
          duration: 0.32,
        })
        .to(
          transitionOverlay,
          {
            scaleY: 1,
            transformOrigin: "bottom",
            duration: 0.52,
            onComplete: () => {
              window.location.href = href;
            },
          },
          "<"
        );
    });
  });
}

if (document.documentElement.dataset.componentsReady === "true") {
  initPageTransition();
} else if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    if (document.documentElement.dataset.componentsReady === "true") {
      initPageTransition();
      return;
    }
    document.addEventListener("components:ready", initPageTransition, { once: true });
  });
} else {
  document.addEventListener("components:ready", initPageTransition, { once: true });
}
