import 'dotenv/config'
import {drizzle} from 'drizzle-orm/node-postgres'
import {Pool} from 'pg'

if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set')
}

export const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 10,
    idleTimeoutMillis: 30000,
})

export const db = drizzle(pool, {casing: "snake_case"})
