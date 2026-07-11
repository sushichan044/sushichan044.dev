import type { TransitionBeforeSwapEvent } from "astro:transitions/client";

type Theme = "dark" | "light";

export type ThemePreference = Theme | "system";

const LOCAL_STORAGE_KEY = "sushichan044-dev-theme-preference";

// Serialized via toString() and injected as an inline <script> in Page.astro.
// Must be self-contained — cannot reference any module-scope identifiers.
export function inlineApplyTheme() {
  // Read
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const stored = localStorage.getItem("sushichan044-dev-theme-preference");
  const preference: ThemePreference =
    stored === "dark" || stored === "light" || stored === "system" ? stored : "system";

  // Apply
  const resolved = preference === "system" ? (systemPrefersDark ? "dark" : "light") : preference;
  const colorScheme = preference === "system" ? "light dark" : preference;

  document.documentElement.dataset["theme"] = resolved;
  document.documentElement.dataset["themePreference"] = preference;
  document.documentElement.style.setProperty("color-scheme", colorScheme);
}

export function updateTheme(preference: ThemePreference) {
  localStorage.setItem(LOCAL_STORAGE_KEY, preference);

  _apply(preference);
}

export function listenSystemThemeChange() {
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
    applyTheme();
  });
}

/**
 * Apply the theme to the incoming document before Astro swaps it in.
 *
 * @see {@link https://docs.astro.build/en/guides/view-transitions/#script-re-execution}
 */
export function listenAstroSoftNavigation() {
  document.addEventListener("astro:before-swap", (event: TransitionBeforeSwapEvent) => {
    applyTheme(event.newDocument);
  });
}

function applyTheme(targetDocument = window.document) {
  const preference = getPreference();

  _apply(preference, targetDocument);
}

function _apply(preference: ThemePreference, targetDocument = window.document) {
  const resolved = resolveTheme(preference);
  const colorScheme = preference === "system" ? "light dark" : preference;

  targetDocument.documentElement.dataset["theme"] = resolved;
  targetDocument.documentElement.dataset["themePreference"] = preference;
  targetDocument.documentElement.style.setProperty("color-scheme", colorScheme);
}

export function getPreference(): ThemePreference {
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);

  if (stored === "dark" || stored === "light" || stored === "system") {
    return stored;
  }

  return "system";
}

function resolveTheme(preference: ThemePreference): Theme {
  if (preference === "system") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  return preference;
}
