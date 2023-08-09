import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { html } from "hono/html";
import { logger } from "hono/logger";

const app = new Hono();
app.use("*", logger());

export const Layout = (props: { children: any }) => html`
  <!doctype html>
  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <script src="https://unpkg.com/htmx.org@1.9.3"></script>
      <title>Hono + htmx</title>
    </head>
    <body>
      <div class="p-4">${props.children}</div>
    </body>
  </html>
`;

app.post("/clicked", (c) => c.html(<h2>Clicked!</h2>));

app.get("/", (c) =>
  c.html(
    <Layout>
      <h1>Hello</h1>

      <button hx-post="/clicked" hx-swap="outerHTML">
        Click Me
      </button>
    </Layout>,
  ),
);

serve(app);
