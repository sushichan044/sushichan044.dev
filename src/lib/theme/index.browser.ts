type ResolvedTheme = "dark" | "light";

export type ThemePreference = "dark" | "light" | "system";

const LOCAL_STORAGE_KEY = "sushichan044-dev-color-mode";

// Serialized via toString() and injected as an inline <script> in Page.astro.
// Must be self-contained — cannot reference any module-scope identifiers.
export function inlineInitTheme() {
  const stored = localStorage.getItem("sushichan044-dev-color-mode");
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  const config = stored === "dark" || stored === "light" || stored === "system" ? stored : "system";

  const resolved = config === "system" ? (systemPrefersDark ? "dark" : "light") : config;
  const colorScheme = config === "system" ? "light dark" : config;

  document.documentElement.dataset["theme"] = resolved;
  document.documentElement.style.setProperty("color-scheme", colorScheme);
}

export function listenSystemThemeChange() {
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
    const theme = queryTheme();
    if (theme === "system") {
      window.document.documentElement.dataset["theme"] = resolveTheme("system");
    }
  });
}

export function queryTheme(): ThemePreference {
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);

  if (stored === "dark" || stored === "light" || stored === "system") {
    return stored;
  }

  return "system";
}

export function updateTheme(theme: ThemePreference) {
  localStorage.setItem(LOCAL_STORAGE_KEY, theme);

  const resolved = resolveTheme(theme);
  const colorScheme = theme === "system" ? "light dark" : theme;
  window.document.documentElement.dataset["theme"] = resolved;
  window.document.documentElement.style.setProperty("color-scheme", colorScheme);
}

function resolveTheme(config: ThemePreference): ResolvedTheme {
  if (config === "system") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  return config;
}
