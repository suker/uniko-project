let componentsLoaded = false;
const componentAssetsLoaded = new Set();

function loadStyle(href) {
  return new Promise((resolve) => {
    if (document.querySelector(`link[data-component-asset=\"${href}\"]`)) {
      resolve();
      return;
    }

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    link.dataset.componentAsset = href;
    link.onload = () => resolve();
    link.onerror = () => resolve();
    document.head.appendChild(link);
  });
}

function loadScript(src) {
  return new Promise((resolve) => {
    if (document.querySelector(`script[data-component-asset=\"${src}\"]`)) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.defer = true;
    script.dataset.componentAsset = src;
    script.onload = () => resolve();
    script.onerror = () => resolve();
    document.body.appendChild(script);
  });
}

async function ensureComponentAssets(name) {
  if (componentAssetsLoaded.has(name)) {
    return;
  }

  const cssHref = `/src/components/${name}.css`;
  const jsSrc = `/src/components/${name}.js`;

  await Promise.all([loadStyle(cssHref), loadScript(jsSrc)]);
  componentAssetsLoaded.add(name);
}

async function injectComponent(slot) {
  const name = slot.dataset.component;
  const response = await fetch(`/src/components/${name}.html`, { cache: "no-store" });

  if (!response.ok) {
    throw new Error(`No se pudo cargar componente: ${name}`);
  }

  slot.innerHTML = await response.text();

  const bodyPage = document.body.dataset.page;

  if (bodyPage) {
    slot.querySelectorAll("[data-page-link]").forEach((link) => {
      if (link.dataset.pageLink === bodyPage) {
        link.classList.add("is-active");
        link.setAttribute("aria-current", "page");
      }
    });
  }

  const footerRoot = slot.querySelector(".about-footer");
  const footerBg = slot.dataset.footerBg;
  if (footerRoot && footerBg) {
    footerRoot.style.background = footerBg;
  }

  await ensureComponentAssets(name);
}

async function loadComponents() {
  if (componentsLoaded) {
    return;
  }

  await loadScript("/i18n.js");

  const slots = Array.from(document.querySelectorAll("[data-component]"));
  if (!slots.length) {
    componentsLoaded = true;
    document.documentElement.dataset.componentsReady = "true";
    document.dispatchEvent(new CustomEvent("components:ready"));
    return;
  }

  await Promise.all(
    slots.map(async (slot) => {
      try {
        await injectComponent(slot);
      } catch (error) {
        console.error(error);
      }
    })
  );

  componentsLoaded = true;
  document.documentElement.dataset.componentsReady = "true";
  document.dispatchEvent(new CustomEvent("components:ready"));
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", loadComponents, { once: true });
} else {
  loadComponents();
}
