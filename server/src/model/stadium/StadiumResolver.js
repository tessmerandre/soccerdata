import { ApolloError } from 'apollo-client/errors/ApolloError';
import { doQuery } from '../../repository';
import { search, mutation } from '../../repository/resource/stadiumQueries'

const stadiumResolver = {
  Query: {
    stadium(parent, args, context) {
      return findById(args, context)
    },
    stadiums(parent, args, context) {
      return findAll(args, context)
    }
  },
  Mutation: {
    addStadium: (parent, args, context) => {
      return addStadium(args, context)
    },
    editStadium: (parent, args, context) => {
      return editStadium(args, context);
    },
    deleteStadium: (parent, args, context) => {
      return deleteStadium(args, context)
    }
  },
};

export async function findById(args, context) {
  const result = await doQuery(search.findById, [args.id])
  return result.rows[0]
}

async function findAll(args, context) {
  const result = await doQuery(search.findAll)
  return result.rows
}

async function addStadium(args, context) {
  const result = await doQuery(mutation.addStadium, [args.stadium.name])
  return result.rows[0]
}

async function editStadium(args, context) {
  const result = await doQuery(mutation.editStadium, [args.id, args.stadium.name])
  return result.rows[0]
}

async function deleteStadium(args, context) {
  const result = await doQuery(mutation.deleteStadium, [args.id])
  return true // check if it succeed instead of always return true
}

export { stadiumResolver };