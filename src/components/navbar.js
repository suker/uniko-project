let navbarInitialized = false;

function initNavbarComponent() {
  if (navbarInitialized) {
    return;
  }
  navbarInitialized = true;

  document.querySelectorAll(".main-nav").forEach((nav) => {
    nav.dataset.componentReady = "true";
  });

  const dropdowns = document.querySelectorAll(".nav-dropdown");

  dropdowns.forEach((dropdown) => {
    const trigger = dropdown.querySelector(".nav-dropdown-trigger");
    if (!trigger) {
      return;
    }
    let closeTimer = null;

    const clearCloseTimer = () => {
      if (!closeTimer) {
        return;
      }
      clearTimeout(closeTimer);
      closeTimer = null;
    };

    const closeDropdown = () => {
      clearCloseTimer();
      dropdown.classList.remove("is-open");
      trigger.setAttribute("aria-expanded", "false");
    };

    const openDropdown = () => {
      clearCloseTimer();
      dropdown.classList.add("is-open");
      trigger.setAttribute("aria-expanded", "true");
    };

    const scheduleClose = () => {
      clearCloseTimer();
      closeTimer = setTimeout(() => {
        closeDropdown();
      }, 180);
    };

    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      const isOpen = dropdown.classList.contains("is-open");
      if (isOpen) {
        closeDropdown();
      } else {
        openDropdown();
      }
    });

    dropdown.addEventListener("mouseenter", () => {
      if (window.matchMedia("(hover: hover)").matches) {
        openDropdown();
      }
    });

    dropdown.addEventListener("mouseleave", () => {
      if (window.matchMedia("(hover: hover)").matches) {
        scheduleClose();
      }
    });

    document.addEventListener("click", (event) => {
      if (!dropdown.contains(event.target)) {
        closeDropdown();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeDropdown();
      }
    });
  });
}

if (document.documentElement.dataset.componentsReady === "true") {
  initNavbarComponent();
} else {
  document.addEventListener("components:ready", initNavbarComponent, { once: true });
}
