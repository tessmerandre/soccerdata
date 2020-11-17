export const search = {
    findById: `select * from season where deleted_at is null and id = $1`,
    findAll: `select * from season where deleted_at is null`,
    getFootballClubPoints: `
    select sum(
        case
            when (team1_score > team2_score and team1_id = $1) or (team2_score > team1_score and team2_id = $1) then 3
            when team1_score = team2_score and (team1_id = $1 or team2_id = $1) then 1
            else 0
        end
    ) as points from "match" where team1_id = $1 or team2_id = $1
    `,
    getFootballClubWins: `select count(*) as wins from match where ((team1_score > team2_score and team1_id = $1) or (team2_score > team1_score and team2_id = $1))`,
    getFootballClubLosses: `select count(*) as losses from match where ((team1_score < team2_score and team1_id = $1) or (team2_score < team1_score and team2_id = $1))`,
    getFootballClubDraws: `select count(*) as draws from match where team1_score = team2_score and (team1_id = $1 or team2_id = $1)`
}

export const mutation = {
    createSeason: `insert into season(name) values($1) returning *`,
    editSeason: `update season set name = $2 where id = $1 returning *`,
    deleteSeason: `update season set deleted_at = now() where id = $1`,
    addFootballclubToSeason: `insert into football_club_season(season_id, football_club_id) values($1, $2)`,
    removeAllFootballclubsFromSeason: `delete from football_club_season where season_id = $1`
}