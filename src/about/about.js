const reduceMotionAbout = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let aboutInitialized = false;

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

window.addEventListener("load", () => {
  window.scrollTo(0, 0);
});

function initAboutScrollReveal() {
  const revealItems = document.querySelectorAll(".about-reveal");

  if (reduceMotionAbout) {
    gsap.set(revealItems, { opacity: 1, y: 0, filter: "none" });
    return;
  }

  gsap.set(revealItems, { opacity: 0, y: 28, filter: "blur(8px)" });

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

  revealItems.forEach((item) => observer.observe(item));
}

function initTitleHoverBounce() {
  if (reduceMotionAbout) {
    return;
  }

  const titleLines = document.querySelectorAll(".about-title-line");

  titleLines.forEach((line) => {
    line.addEventListener("mouseenter", () => {
      gsap.killTweensOf(line);
      gsap.fromTo(
        line,
        { y: 0 },
        {
          y: -6,
          duration: 0.18,
          ease: "power2.out",
          yoyo: true,
          repeat: 1,
        }
      );
    });
  });
}

function initServicesBounce() {
  if (reduceMotionAbout) {
    return;
  }

  const serviceItems = document.querySelectorAll(".services-item.about-reveal");

  serviceItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      gsap.killTweensOf(item);
      gsap.fromTo(
        item,
        { y: 0 },
        {
          y: -7,
          duration: 0.16,
          ease: "power2.out",
          yoyo: true,
          repeat: 1,
        }
      );
    });
  });
}

function initAboutPage() {
  if (aboutInitialized) {
    return;
  }
  aboutInitialized = true;

  const firstTitleLine = document.querySelector(".about-title-line:first-child");
  const secondTitleLine = document.querySelector(".about-title-line:last-child");

  if (reduceMotionAbout) {
    gsap.set(".main-nav .nav-link", { opacity: 1, y: 0, clearProps: "transform" });
    gsap.set(".about-main", { autoAlpha: 1 });
    gsap.set([firstTitleLine, secondTitleLine], { opacity: 1, y: 0, clearProps: "all" });
  } else {
    gsap.set([firstTitleLine, secondTitleLine], { opacity: 1, y: 0, clipPath: "inset(0 100% 0 0)" });

    gsap.timeline({ defaults: { ease: "power3.out" } })
      .to(
        ".main-nav .nav-link",
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.04,
        },
        0
      )
      .to(
        ".about-main",
        {
          autoAlpha: 1,
          duration: 0.01,
        },
        0
      )
      .to(
        firstTitleLine,
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 0.78,
        },
        0
      )
      .to(
        secondTitleLine,
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 0.78,
        },
        0.2
      )
      .from(
        ".about-copy p",
        {
          opacity: 0,
          y: 18,
          duration: 0.46,
          stagger: 0.1,
        },
        "-=0.05"
      )
      .set([firstTitleLine, secondTitleLine], {
        opacity: 1,
        y: 0,
        clearProps: "opacity,transform,clipPath",
      });
  }

  initTitleHoverBounce();
  initServicesBounce();
  initAboutScrollReveal();
}

function initAboutWhenReady() {
  if (document.documentElement.dataset.pageEnterReady === "true") {
    initAboutPage();
  } else {
    document.addEventListener("page:enter-ready", initAboutPage, { once: true });
  }
}

if (document.documentElement.dataset.componentsReady === "true") {
  initAboutWhenReady();
} else {
  document.addEventListener("components:ready", initAboutWhenReady, { once: true });
}
