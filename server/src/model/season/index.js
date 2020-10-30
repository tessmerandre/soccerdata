import { seasonTypeDefs } from './SeasonTypeDef'
import { seasonResolver } from './SeasonResolver'
import { seasonTransformer } from './SeasonTransformer'

const season = {
  typeDefs: [seasonTypeDefs],
  resolvers: [seasonResolver, seasonTransformer],
}

export { season }