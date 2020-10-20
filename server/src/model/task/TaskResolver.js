import { ApolloError } from 'apollo-client/errors/ApolloError';
import { doQuery } from '../../repository';
import { search, mutation } from '../../repository/resource/taskQueries'

const taskResolver = {
  Query: {
    task(_, args, context) {
      return findById(args, context)
    },
    tasks(_, args, context) {
      return findAll(args, context)
    }
  },
  Mutation: {
    addTask: (parent, args, context) => {
      return addTask(args, context)
    }
  },
};

async function findById(args, context) {
  const result = await doQuery(search.findById, [args.id])
  return result.rows[0] // check if its empty
}

async function findAll(args, context) {
  const result = await doQuery(search.findAll)
  console.log(result)
  return result.rows
}

async function addTask(args, context) {
  // add to database
  const result = await doQuery(mutation.addTask, [args.task.title, args.task.description])
  console.log(result)
  return result.rows[0]
}

export { taskResolver };