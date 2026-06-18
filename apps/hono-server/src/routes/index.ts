import { Hono } from "hono";
import todosRoute from "./todosRoutes.js";
import { cors } from "hono/cors";

const app = new Hono()
    .use(cors())
    .route("/todos", todosRoute);

export type AppType = typeof app;

export default app;
