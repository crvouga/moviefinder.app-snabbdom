import { serve } from "bun";
import frontend from "./frontend.html";

const server = serve({
  port: 3000,
  routes: {
    "/": frontend,
  },
  fetch(_req) {
    return Response.redirect("/");
  },
});

console.log(`Server running at http://localhost:${server.port}`);
