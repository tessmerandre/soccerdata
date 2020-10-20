import { Pool } from 'pg'

// add client info

const pool = new Pool({
    host: 'localhost',
    database: 'soccerdata',
    port: 5432,
    user: '',
    password: '',
})

export async function doQuery(query, args, callback) {
    return pool.query(query, args, callback)
}