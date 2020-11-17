import { makeExecutableSchema } from 'graphql-tools'

import { stadium } from './stadium'
import { footballClub } from './football-club'
import { season } from './season'
import { match } from './match'

import { queryDefs } from './QueryDefs'

const appSchema = makeExecutableSchema({
  typeDefs: [
    queryDefs,
    ...stadium.typeDefs,
    ...footballClub.typeDefs,
    ...season.typeDefs,
    ...match.typeDefs
  ],
  resolvers: [
    ...stadium.resolvers,
    ...footballClub.resolvers,
    ...season.resolvers,
    ...match.resolvers
  ],
});

export { appSchema }
