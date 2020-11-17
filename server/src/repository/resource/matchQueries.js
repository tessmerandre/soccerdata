export const search = {
    findById: `select * from match where id = $1`,
    findBySeason: `select * from match where season_id = $1`
}

export const mutation = {
    addMatch: `insert into football_club(name) values($1) returning *`
}