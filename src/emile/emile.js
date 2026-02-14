const reduceMotionEmile = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let emileInitialized = false;
let projectModalInitialized = false;

function initProjectModal() {
  if (projectModalInitialized) {
    return;
  }
  projectModalInitialized = true;

  const modal = document.querySelector("[data-project-modal]");
  const iframe = modal?.querySelector("[data-project-iframe]");
  const openExternal = modal?.querySelector("[data-project-open]");
  const fallbackOpen = modal?.querySelector(".project-modal-fallback-open");
  const fallback = modal?.querySelector("[data-project-fallback]");
  const modalTitle = modal?.querySelector(".project-modal-title");
  const closeTriggers = modal?.querySelectorAll("[data-project-close]");
  const cards = document.querySelectorAll(".work-card[data-project-url]");

  if (!modal || !iframe || !openExternal || !fallbackOpen || !fallback || !modalTitle || !cards.length) {
    return;
  }

  const closeModal = () => {
    document.body.classList.remove("modal-open");
    if (reduceMotionEmile) {
      modal.classList.remove("is-open");
      iframe.src = "about:blank";
      iframe.style.display = "";
      fallback.classList.remove("is-visible");
      modal.setAttribute("aria-hidden", "true");
      return;
    }

    gsap.to(".project-modal-dialog", {
      opacity: 0,
      y: 18,
      duration: 0.2,
      ease: "power2.in",
    });
    gsap.to(modal, {
      opacity: 0,
      duration: 0.22,
      ease: "power2.in",
      onComplete: () => {
        modal.classList.remove("is-open");
        modal.setAttribute("aria-hidden", "true");
        iframe.src = "about:blank";
        iframe.style.display = "";
        fallback.classList.remove("is-visible");
      },
    });
  };

  const openModal = (url, iframeUrl, title, embedAllowed) => {
    modalTitle.textContent = title || "Proyecto";
    openExternal.href = url;
    fallbackOpen.href = url;

    if (embedAllowed) {
      fallback.classList.remove("is-visible");
      iframe.style.display = "";
      iframe.src = iframeUrl || url;
    } else {
      iframe.src = "about:blank";
      iframe.style.display = "none";
      fallback.classList.add("is-visible");
    }

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");

    if (!reduceMotionEmile) {
      gsap.fromTo(
        modal,
        { opacity: 0 },
        { opacity: 1, duration: 0.25, ease: "power2.out" }
      );
      gsap.fromTo(
        ".project-modal-dialog",
        { opacity: 0, y: 22, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "power3.out" }
      );
    }
  };

  cards.forEach((card) => {
    card.addEventListener("click", (event) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }
      event.preventDefault();
      const embedAllowed = card.dataset.projectEmbed !== "false";
      openModal(
        card.dataset.projectUrl,
        card.dataset.projectIframeUrl,
        card.dataset.projectTitle || card.querySelector("h3")?.textContent,
        embedAllowed
      );
    });
  });

  closeTriggers.forEach((trigger) => {
    trigger.addEventListener("click", closeModal);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("is-open")) {
      closeModal();
    }
  });
}

function initWorkCardBounce() {
  if (reduceMotionEmile) {
    return;
  }

  const cards = document.querySelectorAll(".work-card");

  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      gsap.killTweensOf(card);
      gsap.fromTo(
        card,
        { y: 0, scale: 1 },
        {
          y: -8,
          scale: 1.01,
          duration: 0.16,
          ease: "power2.out",
          yoyo: true,
          repeat: 1,
        }
      );
    });
  });
}

function initEmileCarousel() {
  const carousel = document.querySelector("[data-work-carousel]");
  const track = document.querySelector("[data-work-track]");
  const prevButton = document.querySelector(".work-arrow-prev");
  const nextButton = document.querySelector(".work-arrow-next");

  if (!carousel || !track || !prevButton || !nextButton) {
    return;
  }

  const cards = Array.from(track.querySelectorAll(".work-card"));
  if (!cards.length) {
    return;
  }

  let currentIndex = 0;
  let maxIndex = 0;
  let step = 0;
  let isAnimating = false;

  const refreshBounds = () => {
    const firstCard = cards[0];
    const secondCard = cards[1];
    const firstWidth = firstCard.getBoundingClientRect().width;
    const gap = secondCard
      ? secondCard.getBoundingClientRect().left - firstCard.getBoundingClientRect().right
      : 0;

    step = firstWidth + Math.max(gap, 0);
    const visibleWidth = carousel.clientWidth;
    const totalWidth = track.scrollWidth;
    const maxTranslate = Math.max(0, totalWidth - visibleWidth);
    maxIndex = step > 0 ? Math.ceil(maxTranslate / step) : 0;

    currentIndex = Math.min(currentIndex, maxIndex);
    gsap.set(track, { x: -(currentIndex * step) });
  };

  const animateToIndex = (newIndex) => {
    if (isAnimating || newIndex === currentIndex || step <= 0) {
      return;
    }

    isAnimating = true;
    currentIndex = Math.max(0, Math.min(newIndex, maxIndex));

    gsap.to(track, {
      x: -(currentIndex * step),
      duration: reduceMotionEmile ? 0.01 : 0.7,
      ease: "power3.inOut",
      onComplete: () => {
        isAnimating = false;
      },
    });
  };

  prevButton.addEventListener("click", () => {
    animateToIndex(currentIndex - 1);
  });

  nextButton.addEventListener("click", () => {
    animateToIndex(currentIndex + 1);
  });

  window.addEventListener("resize", () => {
    refreshBounds();
  });

  refreshBounds();
  initWorkCardBounce();
  initProjectModal();
}

function initEmilePage() {
  if (emileInitialized) {
    return;
  }
  emileInitialized = true;

  if (reduceMotionEmile) {
    gsap.set(".main-nav .nav-link", { opacity: 1, y: 0, clearProps: "transform" });
    gsap.set(".emile-main", { autoAlpha: 1 });
    gsap.set([".emile-title", ".emile-role", ".emile-profile"], {
      opacity: 1,
      y: 0,
      clearProps: "transform",
    });
    initEmileCarousel();
    return;
  }

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
      ".emile-main",
      {
        autoAlpha: 1,
        duration: 0.01,
      },
      0
    )
    .from(
      ".emile-title",
      {
        opacity: 0,
        y: 20,
        duration: 0.55,
      },
      0.08
    )
    .from(
      ".emile-role",
      {
        opacity: 0,
        y: 16,
        duration: 0.45,
      },
      0.18
    )
    .from(
      ".emile-profile",
      {
        opacity: 0,
        y: 18,
        duration: 0.55,
      },
      0.22
    );

  initEmileCarousel();
}

function initEmileWhenReady() {
  if (document.documentElement.dataset.pageEnterReady === "true") {
    initEmilePage();
  } else {
    document.addEventListener("page:enter-ready", initEmilePage, { once: true });
  }
}

if (document.documentElement.dataset.componentsReady === "true") {
  initEmileWhenReady();
} else {
  document.addEventListener("components:ready", initEmileWhenReady, { once: true });
}
