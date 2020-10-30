export const search = {
    findById: `select * from season where deleted_at is null and id = $1`,
    findAll: `select * from season where deleted_at is null`
}

export const mutation = {
    createSeason: `insert into season(name) values($1) returning *`,
    editSeason: `update season set name = $2 where id = $1 returning *`,
    deleteSeason: `update season set deleted_at = now() where id = $1`,
    addFootballclubToSeason: `insert into football_club_season(season_id, football_club_id) values($1, $2)`,
    removeAllFootballclubsFromSeason: `delete from football_club_season where season_id = $1`
}