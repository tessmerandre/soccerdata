import { ApolloError } from 'apollo-client/errors/ApolloError';
import { doQuery } from '../../repository';
import { search, mutation } from '../../repository/resource/footballClubQueries'

const footballClubResolver = {
  Query: {
    footballClub(parent, args, context) {
      return findById(args, context)
    },
    footballClubs(parent, args, context) {
      return findAll(args, context)
    }
  },
  Mutation: {
    createFootballClub: (parent, args, context) => {
      return createFootballClub(args, context)
    },
    editFootballClub: (parent, args, context) => {
      return editFootballClub(args, context)
    },
    addFootballClubToSeason: (parent, args, context) => {
      return addToSeason(args, context)
    },
    removeFootballClubFromSeason: (parent, args, context) => {
      return removeFromSeason(args, context)
    }
  },
};

async function findById(args, context) {
  const result = await doQuery(search.findById, [args.id])
  return result.rows[0]
}

async function findAll(args, context) {
  const result = await doQuery(search.findAll)
  return result.rows
}

async function createFootballClub(args, context) {
  const result = await doQuery(mutation.createFootballClub, [args.stadium.name])
  return result.rows[0]
}

async function editFootballClub(args, context) {
  const result = await doQuery(mutation.editFootballClub, [args.id, args.stadium.name])
  return result.rows[0]
}

async function addToSeason(args, context) {
  // todo
}

async function removeFromSeason(args, context) {
  // todo
}

export { footballClubResolver };