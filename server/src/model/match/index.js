import { matchTypeDefs } from './MatchTypeDef'
import { matchResolver } from './MatchResolver'
import { matchTransformer } from './MatchTransformer'

const match = {
  typeDefs: [matchTypeDefs],
  resolvers: [matchResolver, matchTransformer],
}

export { match }