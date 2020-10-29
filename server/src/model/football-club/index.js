import { footballClubTypeDefs } from './FootballClubTypeDef';
import { footballClubResolver } from './FootballClubResolver';

const footballClub = {
  typeDefs: [footballClubTypeDefs],
  resolvers: [footballClubResolver],
};

export { footballClub };