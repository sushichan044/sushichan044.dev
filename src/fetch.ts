import type { Fetchable } from "astro";
import { FetchState } from "astro/fetch";
import { astro } from "astro/hono";
import { env } from "cloudflare:workers";
import { createFactory } from "hono/factory";
import { logger } from "hono/logger";
import "temporal-polyfill-lite/global"; // Required to use Temporal in workerd.

type HonoConfig = {
  Bindings: Env;
};

export const honoFactory = createFactory<HonoConfig>();
const app = honoFactory.createApp();

app.use(logger());
app.use(astro());

export default {
  fetch: async (request: Request): Promise<Response> => {
    return app.fetch(request, env, new FetchState(request).locals.cfContext);
  },
} satisfies Fetchable;
