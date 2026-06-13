import {defineConfig}from'drizzle-kit'
import 'dotenv/config'

export default defineConfig({
    out: "./src/drizzle",
    schema: "./src/schema.ts",
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
    casing: "snake_case"
})