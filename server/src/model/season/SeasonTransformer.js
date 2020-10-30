import { getFootclubsOnSeason } from '../football-club/FootballClubResolver'

const seasonTransformer = {
  Season: {
    footballClubs: (e, args, context) => {
      return getFootclubsOnSeason({seasonId: e.id}, context);
    }
  }
};

export { seasonTransformer };
