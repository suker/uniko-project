const reduceMotionContact = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let contactInitialized = false;

function initContactValidation() {
  const form = document.querySelector(".contact-form");
  if (!form || form.dataset.validationReady === "true") {
    return;
  }
  form.dataset.validationReady = "true";

  const company = form.querySelector("#company");
  const fullname = form.querySelector("#fullname");
  const email = form.querySelector("#email");
  const phone = form.querySelector("#phone");
  const feedback = form.querySelector(".contact-form-feedback");

  if (!company || !fullname || !email || !phone || !feedback) {
    return;
  }

  const getField = (input) => input.closest(".contact-field");

  const clearFieldError = (input) => {
    const field = getField(input);
    if (!field) {
      return;
    }
    field.classList.remove("has-error");
    input.removeAttribute("aria-invalid");
    const error = field.querySelector(".contact-error-text");
    if (error) {
      error.remove();
    }
  };

  const setFieldError = (input, message) => {
    const field = getField(input);
    if (!field) {
      return;
    }
    field.classList.add("has-error");
    input.setAttribute("aria-invalid", "true");

    let error = field.querySelector(".contact-error-text");
    if (!error) {
      error = document.createElement("p");
      error.className = "contact-error-text";
      field.appendChild(error);
    }
    error.textContent = message;
  };

  const validate = () => {
    [company, fullname, email, phone].forEach(clearFieldError);
    feedback.textContent = "";

    let isValid = true;
    const hasCompany = company.value.trim().length > 0;
    const hasFullname = fullname.value.trim().length > 0;

    if (!hasCompany && !hasFullname) {
      const nameMessage = "Debes rellenar nombre de empresa o nombre completo.";
      setFieldError(company, nameMessage);
      setFieldError(fullname, nameMessage);
      isValid = false;
    }

    const emailValue = email.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailValue) {
      setFieldError(email, "El correo electrónico es obligatorio.");
      isValid = false;
    } else if (!emailPattern.test(emailValue)) {
      setFieldError(email, "Introduce un correo electrónico válido.");
      isValid = false;
    }

    const phoneValue = phone.value.trim();
    const phoneDigits = phoneValue.replace(/\D/g, "");
    if (!phoneValue) {
      setFieldError(phone, "El número de teléfono es obligatorio.");
      isValid = false;
    } else if (phoneDigits.length < 7) {
      setFieldError(phone, "Introduce un número de teléfono válido.");
      isValid = false;
    }

    if (!isValid) {
      feedback.textContent = "Revisa los campos marcados antes de enviar.";
    }

    return isValid;
  };

  form.addEventListener("submit", (event) => {
    if (!validate()) {
      event.preventDefault();
      return;
    }
    feedback.textContent = "";
  });

  [company, fullname, email, phone].forEach((input) => {
    input.addEventListener("input", () => {
      clearFieldError(input);
      if (feedback.textContent === "Revisa los campos marcados antes de enviar.") {
        feedback.textContent = "";
      }
    });
  });
}

function initContactScrollReveal() {
  const revealItems = document.querySelectorAll(".contact-reveal");

  if (!revealItems.length) {
    return;
  }

  if (reduceMotionContact) {
    gsap.set(revealItems, { opacity: 1, y: 0, filter: "none" });
    return;
  }

  gsap.set(revealItems, { opacity: 0, y: 26, filter: "blur(8px)" });

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
            duration: 0.85,
            ease: "power2.out",
          });
          return;
        }

        gsap.killTweensOf(target);
        gsap.to(target, {
          opacity: 0,
          y: 18,
          filter: "blur(6px)",
          duration: 0.4,
          ease: "power1.out",
        });
      });
    },
    { threshold: 0.2, rootMargin: "0px 0px -6% 0px" }
  );

  revealItems.forEach((item) => observer.observe(item));
}

function initContactPage() {
  if (contactInitialized) {
    return;
  }
  contactInitialized = true;

  const title = document.querySelector(".contact-title");

  if (reduceMotionContact) {
    gsap.set(".main-nav .nav-link", { opacity: 1, y: 0, clearProps: "transform" });
    gsap.set(".contact-main", { autoAlpha: 1 });
    gsap.set([".contact-subtitle", ".contact-form", ".contact-divider"], {
      opacity: 1,
      y: 0,
      clearProps: "transform",
    });
    gsap.set(title, { opacity: 1, clipPath: "inset(0 0% 0 0)" });
    initContactValidation();
    return;
  }

  gsap.set(title, { opacity: 1, clipPath: "inset(0 100% 0 0)" });

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
      ".contact-main",
      {
        autoAlpha: 1,
        duration: 0.01,
      },
      0
    )
    .to(
      title,
      {
        clipPath: "inset(0 0% 0 0)",
        duration: 0.8,
      },
      0
    )
    .from(
      ".contact-subtitle",
      {
        opacity: 0,
        y: 16,
        duration: 0.45,
      },
      0.2
    )
    .from(
      ".contact-form",
      {
        opacity: 0,
        y: 18,
        duration: 0.5,
      },
      0.28
    )
    .from(
      ".contact-divider",
      {
        opacity: 0,
        y: 14,
        duration: 0.42,
      },
      0.4
    )
    .set(title, {
      opacity: 1,
      clearProps: "opacity,clipPath",
    });

  initContactValidation();
  initContactScrollReveal();
}

function initContactWhenReady() {
  if (document.documentElement.dataset.pageEnterReady === "true") {
    initContactPage();
  } else {
    document.addEventListener("page:enter-ready", initContactPage, { once: true });
  }
}

if (document.documentElement.dataset.componentsReady === "true") {
  initContactWhenReady();
} else {
  document.addEventListener("components:ready", initContactWhenReady, { once: true });
}
