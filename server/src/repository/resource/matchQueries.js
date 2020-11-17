export const search = {
    findById: `select * from match where id = $1`,
    findBySeason: `select * from match where season_id = $1`
}

export const mutation = {
    addMatch: `insert into match(stadium_id, season_id, team1_id, team1_score, team2_id, team2_score) values($1, $2, $3, $4, $5, $6) returning *`
}