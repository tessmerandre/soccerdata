import { makeExecutableSchema } from 'graphql-tools'

import { stadium } from './stadium'

import { queryDefs } from './QueryDefs'
import { dateScalar } from '../utils/DateScalar'

const appSchema = makeExecutableSchema({
  typeDefs: [
    queryDefs,
    ...stadium.typeDefs
  ],
  resolvers: [
    ...dateScalar.resolvers,
    ...stadium.resolvers
  ],
});

export { appSchema }
