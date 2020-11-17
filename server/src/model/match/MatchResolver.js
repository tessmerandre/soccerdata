import { ApolloError } from 'apollo-client/errors/ApolloError';
import { doQuery } from '../../repository';
import { search, mutation } from '../../repository/resource/matchQueries'

const matchResolver = {
  Query: {
    match(parent, args, context) {
      return findById(args, context)
    },
    matches(parent, args, context) {
      return findBySeason(args, context)
    }
  },
  Mutation: {
    addMatch: (parent, args, context) => {
      return addMatch(args, context)
    }
  },
};

async function findById(args, context) {
  const result = await doQuery(search.findById, [args.id])
  return result.rows[0]
}

async function findBySeason(args, context) {
  const result = await doQuery(search.findBySeason, [args.seasonId])
  return result.rows
}

async function addMatch(args, context) {
  const result = await doQuery(mutation.createSeason, [args.season.name])
  return result.rows[0]
}

export { matchResolver };