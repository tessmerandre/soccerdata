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
  const matchAlreadyHappenned = await checkIfMatchHasAlreadyHappenned(args, context)
  if (matchAlreadyHappenned) {
    throw new ApolloError("This match has already happenned")
  }
  const result = await doQuery(mutation.addMatch, [args.match.stadium_id, args.match.season_id, args.match.team1_id, args.match.team1_score, args.match.team2_id, args.match.team2_score])
  return result.rows[0]
}

async function checkIfMatchHasAlreadyHappenned(args, context) {
  const result = await doQuery(search.findMatchWithTeams, [args.match.team1_id, args.match.team2_id])
  return result.rowCount != 0
}

export { matchResolver };