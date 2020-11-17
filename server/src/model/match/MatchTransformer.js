import { findById as findSeasonById } from '../season/SeasonResolver'
import { findById as findFootballClubById } from '../football-club/FootballClubResolver'
import { findById as findStadiumById } from '../stadium/StadiumResolver'

const matchTransformer = {
  Match: {
    season: (e, args, context) => {
      return findSeasonById({id: e.season_id}, context);
    },
    team1: (e, args, context) => {
      return findFootballClubById({id: e.team1_id}, context)
    },
    team2: (e, args, context) => {
      return findFootballClubById({id: e.team2_id}, context)
    },
    stadium: (e, args, context) => {
      return findStadiumById({id: e.stadium_id}, context)
    }
  }
};

export { matchTransformer };
