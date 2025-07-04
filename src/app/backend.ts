import { serve } from "bun";
import frontend from "./frontend.html";

const server = serve({
  port: 3000,
  routes: {
    "/": frontend,
  },
  //   fetch(req) {},
});

console.log(`Server running at http://localhost:${server.port}`);
