import { afterEach, beforeEach, expect, test, vi } from "vite-plus/test";

import { listenAstroSoftNavigation } from "./index.browser";

class TestDocument extends EventTarget {
  documentElement = {
    dataset: {} as Record<string, string>,
    style: {
      colorScheme: "",
      setProperty(name: string, value: string) {
        if (name === "color-scheme") {
          this.colorScheme = value;
        }
      },
    },
  };
}

let currentDocument: TestDocument;

beforeEach(() => {
  const document = new TestDocument();
  const storedValues = new Map<string, string>();
  const localStorage = {
    getItem: (key: string) => storedValues.get(key) ?? null,
  };

  storedValues.set("sushichan044-dev-theme-preference", "dark");
  currentDocument = document;
  vi.stubGlobal("document", document);
  vi.stubGlobal("localStorage", localStorage);
  vi.stubGlobal("window", {
    document,
    matchMedia: () => ({ matches: false }),
  });
});

afterEach(() => {
  vi.unstubAllGlobals();
});

test("applies the selected theme to the incoming document before swap", () => {
  listenAstroSoftNavigation();

  const incomingDocument = new TestDocument();
  const event = new Event("astro:before-swap") as Event & {
    newDocument: TestDocument;
  };

  Object.defineProperty(event, "newDocument", { value: incomingDocument });
  currentDocument.dispatchEvent(event);

  expect(incomingDocument.documentElement.dataset).toMatchObject({
    theme: "dark",
    themePreference: "dark",
  });
  expect(incomingDocument.documentElement.style.colorScheme).toBe("dark");
});
