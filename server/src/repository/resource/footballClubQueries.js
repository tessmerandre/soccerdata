export const search = {
    findById: `select * from football_club where deleted_at is null and id = $1`,
    findAll: `select * from football_club where deleted_at is null`
}

export const mutation = {
    createFootballClub: `insert into football_club(name) values($1) returning *`,
    editFootballClub: `update football_club set name = $2 where id = $1 returning *`
}