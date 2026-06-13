import * as schema from '../src/schema.ts'
import {reset, seed} from 'drizzle-seed'
import {db, pool} from '../src/db.ts'

export const seedDb = async() => {
    await reset(db,schema)
    await seed(db,schema).refine((funcs) => ({
        usersTable: {
            columns: {
                age: funcs.int({minValue: 1, maxValue: 100})
            },
            count: 10,
            with: {
                todosTable: 10
            }
        },
        todosTable: {
            columns: {
                title: funcs.valuesFromArray({
                    values: [
                        "title 1",
                        "title 2",
                        "title 3",
                        "title 4",
                        "title 5",

                    ]
                }),
                description: funcs.valuesFromArray({
                    values: [
                        "des 1",
                        "des 2",
                        "des 3",
                        "des 4",
                        "des 5", 
                    ]
                })
            }
        }
    }))
}

seedDb().then(() => {
    console.log("Database seed successfully")
}).catch((err) => {
    console.error(err)
    process.exitCode = 1
}).finally(() => {
    return pool.end()
})
