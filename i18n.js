(function () {
  const STORAGE_KEY = "uniko_lang";
  const SUPPORTED_LANGS = ["es", "en"];
  const DEFAULT_LANG = "es";

  const dict = {
    es: {
      "nav.home": "Home",
      "nav.portfolios": "Portfolios",
      "nav.emile": "Emile",
      "nav.pascale": "Pascale",
      "nav.uniko": "Uniko",
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
      "footer.brandline": "uniko studio © 2026",
      "footer.tagline": "Dos voces, una identidad única",
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
      "home.services.branding.title": "Branding",
      "home.services.branding.col1":
        "<li>Posicionamiento</li><li>Diferenciación</li>",
      "home.services.branding.col2":
        "<li>Branding estratégico</li><li>Naming</li>",
      "home.services.web.title": "Web & Digital",
      "home.services.web.col1":
        "<li>UX/UI</li><li>Diseño web editorial</li>",
      "home.services.web.col2":
        "<li>Dirección visual digital</li><li>E-commerce branding</li>",
      "home.services.packaging.title": "Packaging",
      "home.services.packaging.col1":
        "<li>Packaging</li><li>Jerarquía visual</li>",
      "home.services.packaging.col2":
        "<li>Producción gráfica</li>",
      "home.services.comms.title": "Comunicación",
      "home.services.comms.col1":
        "<li>Storytelling de marca</li><li>Imagen corporativa</li>",
      "home.services.comms.col2":
        "<li>Sistema visual</li><li>Estilo gráfico</li>",
      "home.services.consulting.title": "Consultoría estratégica",
      "home.services.consulting.col1":
        "<li>Auditoría de marca</li><li>Diagnóstico competitivo</li><li>Posicionamiento</li><li>Roadmap creativo</li><li>Customer journey</li>",
      "home.services.consulting.col2":
        "<li>Arquitectura de marca</li><li>Estrategia de lanzamiento</li><li>Evolución de identidad</li><li>Coherencia de touchpoints</li><li>Mentoría de equipos</li>",
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
      "legal.updated": "Última actualización: 14 de febrero de 2026",
      "legal.privacy.title": "Política de Privacidad",
      "legal.privacy.s1.h": "1. Responsable del tratamiento",
      "legal.privacy.s1.p":
        'Uniko Studio ("nosotros") es responsable del tratamiento de datos personales recabados a través de este sitio web y canales asociados de contacto profesional.',
      "legal.privacy.s2.h": "2. Datos que recopilamos",
      "legal.privacy.s2.ul":
        "<li>Datos de identificación: nombre, empresa y cargo.</li><li>Datos de contacto: correo electrónico y teléfono.</li><li>Información de proyecto: objetivos, presupuesto estimado y plazos.</li><li>Datos técnicos básicos de navegación para seguridad y analítica.</li>",
      "legal.privacy.s3.h": "3. Finalidad del uso",
      "legal.privacy.s3.p":
        "Usamos estos datos para responder solicitudes, preparar propuestas de servicios de diseño, gestionar relaciones profesionales y mejorar la experiencia del sitio.",
      "legal.privacy.s4.h": "4. Base legal",
      "legal.privacy.s4.p":
        "Tratamos tus datos bajo consentimiento explícito, ejecución de medidas precontractuales y nuestro interés legítimo en mantener seguridad, calidad y continuidad operativa.",
      "legal.privacy.s5.h": "5. Conservación",
      "legal.privacy.s5.p":
        "Conservamos la información durante el tiempo necesario para cumplir la finalidad de la solicitud y obligaciones legales. Las consultas no activas se revisan periódicamente.",
      "legal.privacy.s6.h": "6. Cesión de datos",
      "legal.privacy.s6.p":
        "No vendemos datos personales. Solo compartimos información con proveedores técnicos necesarios (hosting, correo, analítica) bajo acuerdos de confidencialidad y seguridad.",
      "legal.privacy.s7.h": "7. Derechos de las personas",
      "legal.privacy.s7.p":
        "Puedes solicitar acceso, rectificación, eliminación, oposición o limitación del tratamiento escribiendo a privacy@unikostudio.example.",
      "legal.terms.title": "Términos y Condiciones",
      "legal.terms.s1.h": "1. Alcance del servicio",
      "legal.terms.s1.p":
        "Uniko Studio presta servicios de estrategia, identidad visual, dirección creativa y diseño digital. El alcance específico se define en cada propuesta aprobada por ambas partes.",
      "legal.terms.s2.h": "2. Propuestas y aceptación",
      "legal.terms.s2.p":
        "Toda colaboración comienza con una propuesta escrita que incluye entregables, tiempos, revisiones y costes. La aprobación por escrito se considera aceptación contractual.",
      "legal.terms.s3.h": "3. Condiciones económicas",
      "legal.terms.s3.ul":
        "<li>Los pagos se realizan según hitos definidos en la propuesta.</li><li>Retrasos en pagos pueden pausar entregas y revisiones.</li><li>Gastos externos (impresión, licencias, producción) no se incluyen salvo acuerdo.</li>",
      "legal.terms.s4.h": "4. Propiedad intelectual",
      "legal.terms.s4.p":
        "Los derechos de uso final se transfieren al cliente tras el pago completo. Bocetos, descartes y materiales no aprobados permanecen como propiedad de Uniko Studio.",
      "legal.terms.s5.h": "5. Revisiones y cambios",
      "legal.terms.s5.p":
        "Cada fase incluye un número de rondas de revisión definido previamente. Cambios fuera de alcance o posteriores al cierre de fase podrán presupuestarse por separado.",
      "legal.terms.s6.h": "6. Cancelación y suspensión",
      "legal.terms.s6.p":
        "Cualquiera de las partes puede cancelar por incumplimiento grave o fuerza mayor. El trabajo realizado hasta la fecha será facturado proporcionalmente.",
      "legal.terms.s7.h": "7. Limitación de responsabilidad",
      "legal.terms.s7.p":
        "Uniko Studio no será responsable por pérdidas indirectas, lucro cesante o usos no autorizados de los entregables por terceros.",
      "legal.cookies.title": "Política de Cookies",
      "legal.cookies.s1.h": "1. ¿Qué son las cookies?",
      "legal.cookies.s1.p":
        "Las cookies son archivos pequeños que se almacenan en tu navegador para recordar preferencias, analizar uso del sitio y mejorar la experiencia de navegación.",
      "legal.cookies.s2.h": "2. Tipos de cookies utilizadas",
      "legal.cookies.s2.ul":
        "<li><strong>Técnicas:</strong> necesarias para funcionamiento básico del sitio.</li><li><strong>Analíticas:</strong> nos ayudan a comprender tráfico y comportamiento.</li><li><strong>Preferencias:</strong> guardan idioma o ajustes de visualización.</li>",
      "legal.cookies.s3.h": "3. Finalidad",
      "legal.cookies.s3.p":
        "Usamos cookies para mantener estabilidad técnica, medir rendimiento de páginas, identificar mejoras y optimizar contenido para potenciales clientes del estudio.",
      "legal.cookies.s4.h": "4. Gestión y desactivación",
      "legal.cookies.s4.p":
        "Puedes aceptar, rechazar o eliminar cookies desde la configuración de tu navegador. Desactivar cookies técnicas puede afectar funciones esenciales del sitio.",
      "legal.cookies.s5.h": "5. Terceros",
      "legal.cookies.s5.p":
        "Algunas herramientas externas (analítica o contenido embebido) pueden instalar cookies propias. Recomendamos revisar sus políticas para conocer su tratamiento.",
      "legal.cookies.s6.h": "6. Contacto",
      "legal.cookies.s6.p":
        "Para consultas sobre esta política puedes escribir a privacy@unikostudio.example.",
    },
    en: {
      "nav.home": "Home",
      "nav.portfolios": "Portfolios",
      "nav.emile": "Emile",
      "nav.pascale": "Pascale",
      "nav.uniko": "Uniko",
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
      "footer.brandline": "uniko studio © 2026",
      "footer.tagline": "Two voices, one unique identity",
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
      "home.services.branding.title": "Branding",
      "home.services.branding.col1":
        "<li>Positioning</li><li>Differentiation</li>",
      "home.services.branding.col2":
        "<li>Strategic branding</li><li>Naming</li>",
      "home.services.web.title": "Web & Digital",
      "home.services.web.col1":
        "<li>UX/UI</li><li>Editorial web design</li>",
      "home.services.web.col2":
        "<li>Digital visual direction</li><li>E-commerce branding</li>",
      "home.services.packaging.title": "Packaging",
      "home.services.packaging.col1":
        "<li>Packaging</li><li>Visual hierarchy</li>",
      "home.services.packaging.col2":
        "<li>Print production</li>",
      "home.services.comms.title": "Communication",
      "home.services.comms.col1":
        "<li>Brand storytelling</li><li>Corporate image</li>",
      "home.services.comms.col2":
        "<li>Visual system</li><li>Graphic style</li>",
      "home.services.consulting.title": "Strategic Consulting",
      "home.services.consulting.col1":
        "<li>Brand audit</li><li>Competitive diagnosis</li><li>Positioning</li><li>Creative roadmap</li><li>Customer journey</li>",
      "home.services.consulting.col2":
        "<li>Brand architecture</li><li>Launch strategy</li><li>Identity evolution</li><li>Touchpoint coherence</li><li>Team mentoring</li>",
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
      "legal.updated": "Last updated: February 14, 2026",
      "legal.privacy.title": "Privacy Policy",
      "legal.privacy.s1.h": "1. Data Controller",
      "legal.privacy.s1.p":
        'Uniko Studio ("we") is the data controller for personal information collected through this website and related professional contact channels.',
      "legal.privacy.s2.h": "2. Data We Collect",
      "legal.privacy.s2.ul":
        "<li>Identification data: name, company, and role.</li><li>Contact data: email address and phone number.</li><li>Project details: goals, estimated budget, and timelines.</li><li>Basic technical browsing data for security and analytics.</li>",
      "legal.privacy.s3.h": "3. Purpose of Processing",
      "legal.privacy.s3.p":
        "We use this data to respond to requests, prepare design service proposals, manage professional relationships, and improve website experience.",
      "legal.privacy.s4.h": "4. Legal Basis",
      "legal.privacy.s4.p":
        "We process your data based on explicit consent, pre-contractual measures, and our legitimate interest in maintaining security, quality, and operational continuity.",
      "legal.privacy.s5.h": "5. Data Retention",
      "legal.privacy.s5.p":
        "We retain information for as long as necessary to fulfill the request purpose and legal obligations. Inactive inquiries are periodically reviewed.",
      "legal.privacy.s6.h": "6. Data Sharing",
      "legal.privacy.s6.p":
        "We do not sell personal data. We only share information with necessary technical providers (hosting, email, analytics) under confidentiality and security agreements.",
      "legal.privacy.s7.h": "7. Your Rights",
      "legal.privacy.s7.p":
        "You may request access, correction, deletion, objection, or restriction of processing by writing to privacy@unikostudio.example.",
      "legal.terms.title": "Terms & Conditions",
      "legal.terms.s1.h": "1. Service Scope",
      "legal.terms.s1.p":
        "Uniko Studio provides strategy, visual identity, creative direction, and digital design services. The specific scope is defined in each proposal approved by both parties.",
      "legal.terms.s2.h": "2. Proposals and Acceptance",
      "legal.terms.s2.p":
        "Every collaboration starts with a written proposal including deliverables, timelines, revisions, and costs. Written approval is considered contractual acceptance.",
      "legal.terms.s3.h": "3. Financial Terms",
      "legal.terms.s3.ul":
        "<li>Payments are made according to milestones defined in the proposal.</li><li>Late payments may pause deliveries and revisions.</li><li>External costs (printing, licenses, production) are excluded unless explicitly agreed.</li>",
      "legal.terms.s4.h": "4. Intellectual Property",
      "legal.terms.s4.p":
        "Final usage rights are transferred to the client after full payment. Drafts, discarded concepts, and non-approved materials remain Uniko Studio property.",
      "legal.terms.s5.h": "5. Revisions and Changes",
      "legal.terms.s5.p":
        "Each phase includes a predefined number of revision rounds. Out-of-scope changes or edits after phase closure may be quoted separately.",
      "legal.terms.s6.h": "6. Cancellation and Suspension",
      "legal.terms.s6.p":
        "Either party may cancel in case of material breach or force majeure. Work completed to date will be billed proportionally.",
      "legal.terms.s7.h": "7. Limitation of Liability",
      "legal.terms.s7.p":
        "Uniko Studio is not liable for indirect losses, loss of profit, or unauthorized use of deliverables by third parties.",
      "legal.cookies.title": "Cookies Policy",
      "legal.cookies.s1.h": "1. What Are Cookies?",
      "legal.cookies.s1.p":
        "Cookies are small files stored in your browser to remember preferences, analyze site usage, and improve browsing experience.",
      "legal.cookies.s2.h": "2. Types of Cookies Used",
      "legal.cookies.s2.ul":
        "<li><strong>Technical:</strong> required for basic site functionality.</li><li><strong>Analytics:</strong> help us understand traffic and behavior.</li><li><strong>Preference:</strong> store language or display settings.</li>",
      "legal.cookies.s3.h": "3. Purpose",
      "legal.cookies.s3.p":
        "We use cookies to maintain technical stability, measure page performance, identify improvements, and optimize content for potential studio clients.",
      "legal.cookies.s4.h": "4. Management and Disabling",
      "legal.cookies.s4.p":
        "You can accept, reject, or delete cookies from your browser settings. Disabling technical cookies may affect essential site functions.",
      "legal.cookies.s5.h": "5. Third Parties",
      "legal.cookies.s5.p":
        "Some external tools (analytics or embedded content) may set their own cookies. We recommend reviewing their policies for details.",
      "legal.cookies.s6.h": "6. Contact",
      "legal.cookies.s6.p":
        "For questions about this policy, write to privacy@unikostudio.example.",
    },
  };

  const pageRules = {
    home: [
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
    "privacy-policy": [
      { selector: "#legal-title", key: "legal.privacy.title" },
      { selector: ".legal-updated", key: "legal.updated" },
      { selector: ".legal-section:nth-child(1) h2", key: "legal.privacy.s1.h" },
      { selector: ".legal-section:nth-child(1) p", key: "legal.privacy.s1.p" },
      { selector: ".legal-section:nth-child(2) h2", key: "legal.privacy.s2.h" },
      { selector: ".legal-section:nth-child(2) ul", key: "legal.privacy.s2.ul", html: true },
      { selector: ".legal-section:nth-child(3) h2", key: "legal.privacy.s3.h" },
      { selector: ".legal-section:nth-child(3) p", key: "legal.privacy.s3.p" },
      { selector: ".legal-section:nth-child(4) h2", key: "legal.privacy.s4.h" },
      { selector: ".legal-section:nth-child(4) p", key: "legal.privacy.s4.p" },
      { selector: ".legal-section:nth-child(5) h2", key: "legal.privacy.s5.h" },
      { selector: ".legal-section:nth-child(5) p", key: "legal.privacy.s5.p" },
      { selector: ".legal-section:nth-child(6) h2", key: "legal.privacy.s6.h" },
      { selector: ".legal-section:nth-child(6) p", key: "legal.privacy.s6.p" },
      { selector: ".legal-section:nth-child(7) h2", key: "legal.privacy.s7.h" },
      { selector: ".legal-section:nth-child(7) p", key: "legal.privacy.s7.p" },
    ],
    terms: [
      { selector: "#legal-title", key: "legal.terms.title" },
      { selector: ".legal-updated", key: "legal.updated" },
      { selector: ".legal-section:nth-child(1) h2", key: "legal.terms.s1.h" },
      { selector: ".legal-section:nth-child(1) p", key: "legal.terms.s1.p" },
      { selector: ".legal-section:nth-child(2) h2", key: "legal.terms.s2.h" },
      { selector: ".legal-section:nth-child(2) p", key: "legal.terms.s2.p" },
      { selector: ".legal-section:nth-child(3) h2", key: "legal.terms.s3.h" },
      { selector: ".legal-section:nth-child(3) ul", key: "legal.terms.s3.ul", html: true },
      { selector: ".legal-section:nth-child(4) h2", key: "legal.terms.s4.h" },
      { selector: ".legal-section:nth-child(4) p", key: "legal.terms.s4.p" },
      { selector: ".legal-section:nth-child(5) h2", key: "legal.terms.s5.h" },
      { selector: ".legal-section:nth-child(5) p", key: "legal.terms.s5.p" },
      { selector: ".legal-section:nth-child(6) h2", key: "legal.terms.s6.h" },
      { selector: ".legal-section:nth-child(6) p", key: "legal.terms.s6.p" },
      { selector: ".legal-section:nth-child(7) h2", key: "legal.terms.s7.h" },
      { selector: ".legal-section:nth-child(7) p", key: "legal.terms.s7.p" },
    ],
    cookies: [
      { selector: "#legal-title", key: "legal.cookies.title" },
      { selector: ".legal-updated", key: "legal.updated" },
      { selector: ".legal-section:nth-child(1) h2", key: "legal.cookies.s1.h" },
      { selector: ".legal-section:nth-child(1) p", key: "legal.cookies.s1.p" },
      { selector: ".legal-section:nth-child(2) h2", key: "legal.cookies.s2.h" },
      { selector: ".legal-section:nth-child(2) ul", key: "legal.cookies.s2.ul", html: true },
      { selector: ".legal-section:nth-child(3) h2", key: "legal.cookies.s3.h" },
      { selector: ".legal-section:nth-child(3) p", key: "legal.cookies.s3.p" },
      { selector: ".legal-section:nth-child(4) h2", key: "legal.cookies.s4.h" },
      { selector: ".legal-section:nth-child(4) p", key: "legal.cookies.s4.p" },
      { selector: ".legal-section:nth-child(5) h2", key: "legal.cookies.s5.h" },
      { selector: ".legal-section:nth-child(5) p", key: "legal.cookies.s5.p" },
      { selector: ".legal-section:nth-child(6) h2", key: "legal.cookies.s6.h" },
      { selector: ".legal-section:nth-child(6) p", key: "legal.cookies.s6.p" },
    ],
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
