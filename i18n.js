(function () {
  const STORAGE_KEY = "uniko_lang";
  const SUPPORTED_LANGS = ["es", "en"];
  const DEFAULT_LANG = "es";

  const dict = {
    es: {
      "nav.home": "Home",
      "nav.portfolios": "Portafolios",
      "nav.emile": "Emile",
      "nav.pascale": "Pascale",
      "nav.uniko": "Uniko",
      "nav.about": "Acerca de",
      "nav.contact": "Contacto",
      "footer.home": "Home",
      "footer.about": "Acerca de",
      "footer.contact": "Contacto",
      "footer.emile": "Emile",
      "footer.pascale": "Pascale",
      "footer.uniko": "Uniko",
      "footer.privacy": "Política de Privacidad",
      "footer.terms": "Términos y Condiciones",
      "footer.cookies": "Cookies",
      "footer.brandline": "uniko studio<br />© 2026",
      "footer.tagline": "Dos voces, una identidad",
      "home.loading": "Cargando",
      "home.progress": "en progreso",
      "home.location": "con sede en Inglaterra",
      "about.title1": "“Dos voces,",
      "about.title2": "una identidad única”",
      "about.copy1":
        "uniko studio es un estudio de diseño donde la <strong>estrategia</strong> y la <strong>emoción</strong> se encuentran.",
      "about.copy2":
        "Trabajamos de forma colaborativa, el pensamiento estratégico guía la creatividad.",
      "about.servicesTitle": "SERVICIOS",
      "about.service1": "Estrategia de marca",
      "about.service2": "Experiencia de marca",
      "about.service3": "Diseño digital",
      "about.service4": "Diseño de marca",
      "emile.role": "Estrategia y Diseño Web",
      "emile.copy1":
        "Emile Lord Ayotte es diseñador<br />digital con enfoque estratégico.",
      "emile.copy2":
        "Trabaja desde la claridad y la<br />estructura, aplica el pensamiento<br />de diseño como herramienta",
      "pascale.role": "Diseño Visual y Emocional",
      "pascale.copy1":
        "Pascale es diseñadora visual<br />con un enfoque sensible y emocional",
      "pascale.copy2":
        "Trabaja desde la intuición, la estética,<br />narrativa visual y diseño como<br />herramienta para generar conexión",
      "contact.title": "HABLEMOS",
      "contact.subtitle": "Construyamos algo significativo.",
      "contact.company": "Nombre de empresa*",
      "contact.fullname": "Nombre completo*",
      "contact.email": "Dirección de correo electrónico*",
      "contact.phone": "Número de teléfono*",
      "contact.project": "Acerca del proyecto*",
      "contact.submit": "Enviar",
      "legal.privacy.title": "Política de Privacidad",
      "legal.terms.title": "Términos y Condiciones",
      "legal.cookies.title": "Política de Cookies",
    },
    en: {
      "nav.home": "Home",
      "nav.portfolios": "Portfolios",
      "nav.emile": "Emile",
      "nav.pascale": "Pascale",
      "nav.uniko": "Uniko",
      "nav.about": "About",
      "nav.contact": "Contact",
      "footer.home": "Home",
      "footer.about": "About",
      "footer.contact": "Contact",
      "footer.emile": "Emile",
      "footer.pascale": "Pascale",
      "footer.uniko": "Uniko",
      "footer.privacy": "Privacy Policy",
      "footer.terms": "Terms & Conditions",
      "footer.cookies": "Cookies",
      "footer.brandline": "uniko studio<br />© 2026",
      "footer.tagline": "Two voices, one identity",
      "home.loading": "Loading",
      "home.progress": "in progress",
      "home.location": "based in England",
      "about.title1": "“Two voices,",
      "about.title2": "one unique identity”",
      "about.copy1":
        "uniko studio is a design studio where <strong>strategy</strong> and <strong>emotion</strong> meet.",
      "about.copy2":
        "We work collaboratively; strategic thinking guides creativity.",
      "about.servicesTitle": "SERVICES",
      "about.service1": "Brand strategy",
      "about.service2": "Brand experience",
      "about.service3": "Digital design",
      "about.service4": "Brand design",
      "emile.role": "Strategy & Web Design",
      "emile.copy1":
        "Emile Lord Ayotte is a digital designer<br />with a strategic approach.",
      "emile.copy2":
        "He works from clarity and structure,<br />using design thinking as a practical<br />creative tool.",
      "pascale.role": "Visual & Emotional Design",
      "pascale.copy1":
        "Pascale is a visual designer<br />with a sensitive and emotional approach.",
      "pascale.copy2":
        "She works through intuition and aesthetics,<br />using visual narrative and design as a<br />tool to build connection.",
      "contact.title": "LET'S TALK",
      "contact.subtitle": "Let's build something meaningful.",
      "contact.company": "Company name*",
      "contact.fullname": "Full name*",
      "contact.email": "Email address*",
      "contact.phone": "Phone number*",
      "contact.project": "About the project*",
      "contact.submit": "Send",
      "legal.privacy.title": "Privacy Policy",
      "legal.terms.title": "Terms & Conditions",
      "legal.cookies.title": "Cookies Policy",
    },
  };

  const pageRules = {
    home: [
      { selector: ".preload-left", key: "home.loading" },
      { selector: ".preload-right", key: "home.progress" },
      { selector: ".location", key: "home.location" },
    ],
    about: [
      { selector: ".about-title .about-title-line:first-child", key: "about.title1" },
      { selector: ".about-title .about-title-line:last-child", key: "about.title2" },
      { selector: ".about-copy p:first-child", key: "about.copy1", html: true },
      { selector: ".about-copy p:last-child", key: "about.copy2" },
      { selector: "#services-title", key: "about.servicesTitle" },
      { selector: ".services-list .services-item:nth-child(1) span:first-child", key: "about.service1" },
      { selector: ".services-list .services-item:nth-child(2) span:first-child", key: "about.service2" },
      { selector: ".services-list .services-item:nth-child(3) span:first-child", key: "about.service3" },
      { selector: ".services-list .services-item:nth-child(4) span:first-child", key: "about.service4" },
    ],
    emile: [
      { selector: ".emile-role", key: "emile.role" },
      { selector: ".emile-copy p:first-child", key: "emile.copy1", html: true },
      { selector: ".emile-copy p:last-child", key: "emile.copy2", html: true },
    ],
    pascale: [
      { selector: ".pascale-role", key: "pascale.role" },
      { selector: ".pascale-copy p:first-child", key: "pascale.copy1", html: true },
      { selector: ".pascale-copy p:last-child", key: "pascale.copy2", html: true },
    ],
    contact: [
      { selector: "#contact-title", key: "contact.title" },
      { selector: ".contact-subtitle", key: "contact.subtitle" },
      { selector: "label[for='company']", key: "contact.company" },
      { selector: "label[for='fullname']", key: "contact.fullname" },
      { selector: "label[for='email']", key: "contact.email" },
      { selector: "label[for='phone']", key: "contact.phone" },
      { selector: "label[for='project']", key: "contact.project" },
      { selector: ".contact-submit", key: "contact.submit" },
    ],
    "privacy-policy": [{ selector: "#legal-title", key: "legal.privacy.title" }],
    terms: [{ selector: "#legal-title", key: "legal.terms.title" }],
    cookies: [{ selector: "#legal-title", key: "legal.cookies.title" }],
  };

  function resolveLang(lang) {
    if (!SUPPORTED_LANGS.includes(lang)) {
      return DEFAULT_LANG;
    }
    return lang;
  }

  function getCurrentLang() {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return resolveLang(stored || DEFAULT_LANG);
  }

  function t(lang, key) {
    return dict[lang]?.[key] ?? dict[DEFAULT_LANG]?.[key] ?? key;
  }

  function applyI18nToDocument(lang) {
    document.documentElement.lang = lang;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      el.textContent = t(lang, key);
    });

    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      const key = el.getAttribute("data-i18n-html");
      el.innerHTML = t(lang, key);
    });

    const page = document.body?.dataset?.page;
    (pageRules[page] || []).forEach((rule) => {
      const node = document.querySelector(rule.selector);
      if (!node) {
        return;
      }
      const translated = t(lang, rule.key);
      if (rule.html) {
        node.innerHTML = translated;
      } else {
        node.textContent = translated;
      }
    });

    document.querySelectorAll("[data-lang-switch]").forEach((btn) => {
      btn.classList.toggle("is-active", btn.dataset.langSwitch === lang);
      btn.setAttribute("aria-pressed", btn.dataset.langSwitch === lang ? "true" : "false");
    });
  }

  function setLanguage(lang) {
    const normalized = resolveLang(lang);
    window.localStorage.setItem(STORAGE_KEY, normalized);
    applyI18nToDocument(normalized);
  }

  function initLanguageButtons() {
    document.querySelectorAll("[data-lang-switch]").forEach((btn) => {
      if (btn.dataset.i18nBound === "true") {
        return;
      }
      btn.dataset.i18nBound = "true";
      btn.addEventListener("click", () => {
        setLanguage(btn.dataset.langSwitch);
      });
    });
  }

  function runI18n() {
    const lang = getCurrentLang();
    applyI18nToDocument(lang);
    initLanguageButtons();
  }

  window.unikoI18n = {
    setLanguage,
    getLanguage: getCurrentLang,
    apply: runI18n,
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", runI18n, { once: true });
  } else {
    runI18n();
  }

  document.addEventListener("components:ready", runI18n);
})();
