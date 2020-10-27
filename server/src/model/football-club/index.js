import { footballClubTypeDefs } from './FootballClubTypeDef';
import { footballResolver } from './FootballClubResolver';

const footballClub = {
  typeDefs: [footballClubTypeDefs],
  resolvers: [footballResolver],
};

export { footballClub };