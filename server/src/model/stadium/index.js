import { stadiumTypeDefs } from './StadiumTypeDef';
import { stadiumResolver } from './StadiumResolver';

const stadium = {
  typeDefs: [stadiumTypeDefs],
  resolvers: [stadiumResolver],
};

export { stadium };