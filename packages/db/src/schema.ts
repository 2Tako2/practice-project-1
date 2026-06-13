
import { sql } from "drizzle-orm";
import { integer, pgTable, uuid, varchar , timestamp, check, boolean} from "drizzle-orm/pg-core";

export const usersTable = pgTable('users', {
    id: uuid().primaryKey().defaultRandom(),
    email: varchar({length: 256}).unique().notNull(),
    passwordHash: varchar({length: 500}).notNull(),
    age: integer(),
    createdAt: timestamp({withTimezone: true}).defaultNow(),
    updatedAt: timestamp({withTimezone: true}).defaultNow(),
}, (table) => [
    check('age_check_max', sql`${table.age} <= 120`),
    check('age_check_min', sql`${table.age} >= 0`)
])

export const todosTable = pgTable('todos', {
    id: uuid().primaryKey().defaultRandom(),
    userId: uuid().notNull().references(() => usersTable.id, {onDelete: 'cascade'}),
    title: varchar({length: 500}).notNull(),
    description: varchar({length: 1000}),
    completed: boolean().default(false),
    createdAt: timestamp({withTimezone: true}).defaultNow(),
    updatedAt: timestamp({withTimezone: true}).defaultNow(),
})