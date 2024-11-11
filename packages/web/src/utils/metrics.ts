import { Registry, collectDefaultMetrics, Counter } from "prom-client";

export const register = new Registry();
collectDefaultMetrics({ register });

export const pageViews = new Counter({
  name: "page_views",
  help: "Total page views",
  registers: [register],
});
