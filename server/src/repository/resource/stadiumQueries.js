export const search = {
    findById: `select * from stadium where deleted_at is null and id = $1`,
    findAll: `select * from stadium where deleted_at is null`
}

export const mutation = {
    addStadium: `insert into stadium(name) values($1) returning *`,
    editStadium: `update stadium set name = $2 where id = $1 returning *`,
    deleteStadium: `update stadium set deleted_at = now() where id = $1`
}