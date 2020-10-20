export const search = {
    findById: `select * from task where id = $1`,
    findAll: `select * from task`
}

export const mutation = {
    addTask: `insert into task(title, description) values($1, $2) returning *`
}