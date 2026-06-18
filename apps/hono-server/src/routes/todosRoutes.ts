import { Hono } from "hono";
import { todosTable } from "@practice-project-1/db/schema";
import { DrizzleQueryError, eq } from "drizzle-orm";
import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import { zValidator } from "@hono/zod-validator";
import z from "zod";

const todoValidation = {
  title: (schema: z.ZodString) =>
    schema.min(5, "Title should be at least 5 characters"),
};

export const createTodoSchema = createInsertSchema(todosTable, todoValidation);
export type CreateTodoSchema = z.infer<typeof createTodoSchema>;

export const todoSchema = createSelectSchema(todosTable);
export type TodoSchema = z.infer<typeof todoSchema>;

export const updateTodoSchema = createUpdateSchema(todosTable, todoValidation);
export type UpdateTodoSchema = z.infer<typeof todoSchema>;

export const idSchema = createSelectSchema(todosTable).omit({
  userId: true,
  title: true,
  description: true,
  completed: true,
  createdAt: true,
  updatedAt: true,
});
export type IdSchema = z.infer<typeof idSchema>;

const db = drizzle(process.env.DATABASE_URL ?? "");
const todosRoute = new Hono()
  .get("/", (c) => {
    return c.text("Hello Hono!");
  })
  .get("/:todoId", zValidator("param", idSchema), async (c) => {
    const { id } = c.req.valid("param");
    const todo = await db
      .select()
      .from(todosTable)
      .where(eq(todosTable.id, id))
      .limit(1);

    return c.json(todo, { status: 200 });
  })
  .post("/", zValidator("json", createTodoSchema), async (c) => {
    const data = c.req.valid("json");
    const { userId, title, description, completed } = data;

    const [todo] = await db
      .insert(todosTable)
      .values({
        userId,
        title,
        description,
        completed,
      })
      .returning();

    return c.json({ todo }, 201);
  })
  .put(
    "/:todoId",
    zValidator("param", idSchema),
    zValidator("json", updateTodoSchema),
    async (c) => {
      const { id } = c.req.valid("param");

      try {
        const todoData = await c.req.valid("json");

        const updatedTodo = await db
          .update(todosTable)
          .set(todoData)
          .where(eq(todosTable.id, id))
          .returning();

        return c.json(updatedTodo, { status: 200 });
      } catch (err) {
        if (err instanceof DrizzleQueryError) {
          return c.json({ error: "Database error", details: err.message }, 500);
        }
        return c.json({ error: "Failed to update book" }, 500);
      }
    },
  )
  .delete("/:todoId", zValidator("param", idSchema), async (c) => {
    const { id } = c.req.valid("param");
    const deletedTodo = await db
      .delete(todosTable)
      .where(eq(todosTable.id, id))
      .returning();
    return c.json(deletedTodo, { status: 200 });
  });

export default todosRoute;
