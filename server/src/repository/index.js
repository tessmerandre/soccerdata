import { Pool } from 'pg'

const pool = new Pool({
    host: 'localhost',
    database: 'soccerdata',
    port: 5432,
    user: 'admin',
    password: 'admin',
})

export async function doQuery(query, args, callback) {
    return pool.query(query, args, callback)
}