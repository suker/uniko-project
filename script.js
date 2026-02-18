const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let homeInitialized = false;

function initHomePage() {
  if (homeInitialized) {
    return;
  }
  homeInitialized = true;

  const site = document.querySelector(".site");
  const aboutSection = document.querySelector("#about");
  const aboutQuote = document.querySelector(".about-quote-line");
  const aboutQuoteSpans = aboutQuote ? Array.from(aboutQuote.querySelectorAll("span")) : [];
  const aboutCards = Array.from(document.querySelectorAll(".about-card"));
  const servicesTitle = document.querySelector(".services-title");
  const servicesDivider = document.querySelector(".services-divider");
  const serviceItems = Array.from(document.querySelectorAll(".service-accordion-item"));
  const serviceTriggers = Array.from(document.querySelectorAll(".service-accordion-trigger"));
  const aboutCardItems = aboutCards.filter(Boolean);
  const aboutIntroItems = [aboutQuote, ...aboutCardItems].filter(Boolean);
  const aboutRevealItems = [servicesDivider, servicesTitle, ...serviceItems].filter(Boolean);

  if (!site) {
    return;
  }

  function initAboutIntroScrollReveal() {
    if (!aboutSection || !aboutIntroItems.length) {
      return;
    }

    if (prefersReducedMotion) {
      gsap.set(aboutIntroItems, { opacity: 1, y: 0, filter: "none", clipPath: "none" });
      return;
    }

    gsap.set(aboutCardItems, { opacity: 0, y: 22, filter: "blur(6px)" });
    if (aboutQuote) {
      gsap.set(aboutQuote, { opacity: 0 });
    }

    const runQuoteTypewriter = (onComplete) => {
      if (!aboutQuote || !aboutQuoteSpans.length || aboutQuote.dataset.typewriterDone === "true") {
        if (typeof onComplete === "function") {
          onComplete();
        }
        return 0;
      }

      const spanTexts = aboutQuoteSpans.map((span) => span.textContent);
      const allText = spanTexts.join(" ");
      const punctuationCount = (allText.match(/[.,;:!?'"»”“]/g) || []).length;
      const estimatedDuration = 120 + allText.length * 44 + punctuationCount * 18;
      gsap.set(aboutQuote, { opacity: 1 });
      aboutQuote.classList.add("is-typing");
      aboutQuoteSpans.forEach((span) => {
        span.textContent = "";
      });

      let spanIndex = 0;
      let charIndex = 0;

      const typeNextChar = () => {
        if (spanIndex >= aboutQuoteSpans.length) {
          aboutQuote.classList.remove("is-typing");
          aboutQuote.dataset.typewriterDone = "true";
          if (typeof onComplete === "function") {
            onComplete();
          }
          return;
        }

        const text = spanTexts[spanIndex];
        const nextLength = charIndex + 1;
        aboutQuoteSpans[spanIndex].textContent = text.slice(0, nextLength);
        charIndex += 1;

        if (charIndex >= text.length) {
          spanIndex += 1;
          charIndex = 0;
        }

        const isPunctuation = /[.,;:!?'"»”“]/.test(
          aboutQuoteSpans[Math.max(spanIndex - 1, 0)].textContent.slice(-1)
        );
        const delay = isPunctuation ? 62 : 44;
        window.setTimeout(typeNextChar, delay);
      };

      window.setTimeout(typeNextChar, 120);
      return estimatedDuration;
    };

    let cardsScrollRevealReady = false;
    const initCardsScrollReveal = () => {
      if (cardsScrollRevealReady || !aboutCardItems.length) {
        return;
      }
      cardsScrollRevealReady = true;

      if (!window.ScrollTrigger) {
        gsap.to(aboutCardItems, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.72,
          stagger: 0.15,
          ease: "power3.out",
          clearProps: "opacity,transform,filter",
        });
        return;
      }

      aboutCardItems.forEach((card, index) => {
        gsap.to(card, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: index === 0 ? "top 92%" : "top 90%",
            end: index === 0 ? "top 62%" : "top 60%",
            scrub: 0.55,
          },
        });
      });
    };

    let introRevealed = false;
    const revealIntro = () => {
      if (introRevealed) {
        return;
      }
      introRevealed = true;
      if (aboutQuote) {
        runQuoteTypewriter(() => {
          // Give the quote a beat after finishing before cards begin to reveal.
          window.setTimeout(initCardsScrollReveal, 320);
        });
        return;
      }
      window.setTimeout(initCardsScrollReveal, 320);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }
          if (window.scrollY <= 24) {
            return;
          }
          revealIntro();
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.25, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(aboutSection);

    const onFirstScroll = () => {
      if (window.scrollY <= 24) {
        return;
      }
      const rect = aboutSection.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92) {
        revealIntro();
        observer.unobserve(aboutSection);
      }
      window.removeEventListener("scroll", onFirstScroll);
    };

    window.addEventListener("scroll", onFirstScroll, { passive: true });
  }

  function initAboutScrollReveal() {
    if (!aboutRevealItems.length) {
      return;
    }

    if (prefersReducedMotion) {
      gsap.set(aboutRevealItems, { opacity: 1, y: 0, filter: "none" });
      return;
    }

    gsap.set(aboutRevealItems, { opacity: 0, y: 28, filter: "blur(8px)" });

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

    aboutRevealItems.forEach((item) => observer.observe(item));
  }

  function initAboutHoverEffects() {
    if (prefersReducedMotion) {
      return;
    }

    if (aboutQuote) {
      aboutQuote.addEventListener("mouseenter", () => {
        gsap.killTweensOf(aboutQuote);
        gsap.fromTo(
          aboutQuote,
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
    }

    serviceTriggers.forEach((trigger) => {
      trigger.addEventListener("mouseenter", () => {
        gsap.killTweensOf(trigger);
        gsap.fromTo(
          trigger,
          { y: 0 },
          {
            y: -4,
            duration: 0.16,
            ease: "power2.out",
            yoyo: true,
            repeat: 1,
          }
        );
      });
    });
  }

  function initServicesAccordion() {
    if (!serviceItems.length) {
      return;
    }

    const closeItem = (item) => {
      const trigger = item.querySelector(".service-accordion-trigger");
      const panel = item.querySelector(".service-accordion-panel");
      if (!trigger || !panel) {
        return;
      }
      item.classList.remove("is-open");
      trigger.setAttribute("aria-expanded", "false");
      panel.hidden = true;
    };

    const openItem = (item) => {
      const trigger = item.querySelector(".service-accordion-trigger");
      const panel = item.querySelector(".service-accordion-panel");
      if (!trigger || !panel) {
        return;
      }
      item.classList.add("is-open");
      trigger.setAttribute("aria-expanded", "true");
      panel.hidden = false;

      if (!prefersReducedMotion) {
        const rows = panel.querySelectorAll("li");
        gsap.fromTo(
          rows,
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.28,
            stagger: 0.02,
            ease: "power2.out",
            clearProps: "opacity,transform",
          }
        );
      }
    };

    serviceTriggers.forEach((trigger) => {
      trigger.addEventListener("click", () => {
        const item = trigger.closest(".service-accordion-item");
        if (!item) {
          return;
        }
        const isOpen = item.classList.contains("is-open");
        serviceItems.forEach(closeItem);
        if (!isOpen) {
          openItem(item);
        }
      });
    });

  }

  function revealSite() {
    gsap.set(site, { autoAlpha: 1, visibility: "visible" });

    const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
    timeline.from(
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
        0.08
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

  if (prefersReducedMotion) {
    gsap.set(site, { autoAlpha: 1, visibility: "visible" });
    gsap.set([...aboutIntroItems, ...aboutRevealItems].filter(Boolean), {
      opacity: 1,
      visibility: "visible",
      y: 0,
      filter: "none",
    });
    return;
  }

  if (aboutSection && aboutIntroItems.length) {
    gsap.set(aboutIntroItems, { visibility: "visible" });
  }

  revealSite();
  initAboutIntroScrollReveal();
  initServicesAccordion();
  initAboutHoverEffects();
  initAboutScrollReveal();
}

if (document.documentElement.dataset.componentsReady === "true") {
  initHomePage();
} else {
  document.addEventListener("components:ready", initHomePage, { once: true });
}
