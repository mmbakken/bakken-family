import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono();

const useHttps = Deno.env.get("USE_HTTPS") === "true";
console.log(Deno.env.get("USE_HTTPS"));
console.log(typeof Deno.env.get("USE_HTTPS"));

console.log("useHttps: " + useHttps);

// CORS should be called before the route
// app.use("/api/*", cors());
app.use(
  "/api/*",
  cors({
    origin: [
      "https://www.bakken.family",
      "https://bakken.family",
      "localhost:5173",
    ],
    allowHeaders: ["X-Custom-Header", "Upgrade-Insecure-Requests"],
    allowMethods: ["POST", "PUT", "GET", "OPTIONS", "DELETE"],
    exposeHeaders: ["Content-Length", "X-Kuma-Revision"],
    maxAge: 600,
    credentials: true,
  }),
);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/api/v1/wedding", (c) => {
  return c.text("Wedding API is loading.");
});

import { listenAndServeTLS } from "https://deno.land/std@0.74.0/http/server.ts";

const body = "Hello HTTPS";
const options = {
  port: 443,
  certFile: "/etc/letsencrypt/live/denohttpstest.lcas.dev/fullchain.pem",
  keyFile: "/etc/letsencrypt/live/denohttpstest.lcas.dev/privkey.pem",
};
listenAndServeTLS(options, (req) => {
  req.respond({ body });
});

const devConfig = {};
const prodConfig = {
  port: 443,
  cert: await Deno.readTextFile("/etc/letsencrypt/live/bakken.family/cert.pem"),
  key: await Deno.readTextFile("/etc/letsencrypt/live/bakken.family/key.pem"),
};
const config = useHttps ? prodConfig : devConfig;

Deno.serve(config, app.fetch);
