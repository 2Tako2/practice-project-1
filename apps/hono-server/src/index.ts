import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import {drizzle} from 'drizzle-orm/node-postgres'
import "dotenv/config";

const app = new Hono()

const db = drizzle(process.env.DATABASE_URL ?? "")

app.get('/', (c) => {
  return c.text('Hello Hono!')
}).post("/book", (c) => {
  return c.json({result: "123"}, {status: 200})
})

serve({
  fetch: app.fetch,
  port: 8080
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
