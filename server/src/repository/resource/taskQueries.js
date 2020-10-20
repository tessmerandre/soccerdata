export const search = {
    findById: `select * from task where id = $1`,
    findAll: `select * from task`
}

export const mutation = {
    addTask: `insert into task(title, description) values($1, $2) returning *`,
    editTask: `update task set title = $2, description = $3 where id = $1 returning *`,
    changeTaskStatus: `update task set completed = $2 where id = $1 returning *`
}