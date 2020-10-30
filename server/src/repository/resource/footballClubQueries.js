export const search = {
    findById: `select * from football_club where deleted_at is null and id = $1`,
    findAll: `select * from football_club where deleted_at is null`,
    footballClubsOnSeason: `
    select fbc.*
    from football_club fbc
    join football_club_season fcs on (fbc.id = fcs.football_club_id)
    left join season sea on (sea.id = fcs.season_id)
    where sea.id = $1
    and fbc.deleted_at is null
    `
}

export const mutation = {
    createFootballClub: `insert into football_club(name) values($1) returning *`,
    editFootballClub: `update football_club set name = $2 where id = $1 returning *`
}