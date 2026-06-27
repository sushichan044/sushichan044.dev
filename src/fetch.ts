import { FetchState, astro } from "astro/fetch";
// Required to use Temporal in workerd.
import "temporal-polyfill-lite/global";

export default {
  async fetch(request: Request): Promise<Response> {
    const state = new FetchState(request);

    const response = await astro(state);

    return response;
  },
};
