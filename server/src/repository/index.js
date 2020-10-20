import { Pool } from 'pg'

// add client info

const pool = new Pool({
    host: 'db',
    database: 'soccerdata',
    port: 5432,
    user: 'admin',
    password: 'admin',
})

export async function doQuery(query, args, callback) {
    return pool.query(query, args, callback)
}