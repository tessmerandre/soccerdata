import { ApolloError } from 'apollo-client/errors/ApolloError';
import { AddMergedTypeSelectionSets } from 'graphql-tools';
import { doQuery } from '../../repository';
import { search, mutation } from '../../repository/resource/seasonQueries'

const seasonResolver = {
  Query: {
    season(parent, args, context) {
      return findById(args, context)
    },
    seasons(parent, args, context) {
      return findAll(args, context)
    }
  },
  Mutation: {
    createSeason: (parent, args, context) => {
      return createSeason(args, context)
    },
    editSeason: (parent, args, context) => {
      return editSeason(args, context);
    },
    deleteSeason: (parent, args, context) => {
      return deleteSeason(args, context)
    },
    addFootclubsToSeason: (parent, args, context) => {
      return addFootclubsToSeason(args, context)
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

async function createSeason(args, context) {
  const result = await doQuery(mutation.createSeason, [args.season.name])
  return result.rows[0]
}

async function editSeason(args, context) {
  const result = await doQuery(mutation.editSeason, [args.id, args.season.name])
  return result.rows[0]
}

async function deleteSeason(args, context) {
  const result = await doQuery(mutation.deleteSeason, [args.id])
  return true // check if it succeed instead of always return true
}

async function addFootclubsToSeason(args, context) {
  const seasonId = args.seasonId
  const clubs = args.clubs

  clubs.forEach(async club => {
    const result = await doQuery(mutation.addFootballclubToSeason, [seasonId, club.id])
  });

  return findById(args)
}

export { seasonResolver };