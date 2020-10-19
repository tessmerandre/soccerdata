import { makeExecutableSchema } from 'graphql-tools'
import { task } from './task'
import { queryDefs } from './QueryDefs'
import { dateScalar } from '../utils/DateScalar'

const appSchema = makeExecutableSchema({
  typeDefs: [
    queryDefs,
    ...task.typeDefs
  ],
  resolvers: [
    ...dateScalar.resolvers,
    ...task.resolvers
  ],
});

export { appSchema }
