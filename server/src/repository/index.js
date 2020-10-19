import { Client } from 'pg'

// add client info

const client = new Client({
    host: 'my.database-server.com',
    port: 5334,
    user: 'database-user',
    password: 'secretpassword!!',
})

export async function doQuery(query, args, callback) {
    client.query(query, args, callback)
}