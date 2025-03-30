import { Hono } from "hono";
import { cors } from "hono/cors";
import { listenAndServeTLS } from "https://deno.land/std@0.74.0/http/server.ts";

const app = new Hono();

console.log(Deno.env.get("USE_HTTPS"));
const useHttps = Deno.env.get("USE_HTTPS") === "true";
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

const devConfig = {};
const prodConfig = {
  port: 443,
  cert: await Deno.readTextFile("/etc/letsencrypt/live/bakken.family/cert.pem"),
  key: await Deno.readTextFile("/etc/letsencrypt/live/bakken.family/key.pem"),
};
const config = useHttps ? prodConfig : devConfig;

console.log("config settings for Deno.serve: ");
console.dir(config);

Deno.serve(config, app.fetch);
