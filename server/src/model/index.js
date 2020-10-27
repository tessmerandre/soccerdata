import { makeExecutableSchema } from 'graphql-tools'

import { stadium } from './stadium'
import { footballClub } from './football-club'

import { queryDefs } from './QueryDefs'
import { dateScalar } from '../utils/DateScalar'

const appSchema = makeExecutableSchema({
  typeDefs: [
    queryDefs,
    ...stadium.typeDefs,
    ...footballClub.typeDefs
  ],
  resolvers: [
    ...dateScalar.resolvers,
    ...stadium.resolvers,
    ...footballClub.resolvers
  ],
});

export { appSchema }
