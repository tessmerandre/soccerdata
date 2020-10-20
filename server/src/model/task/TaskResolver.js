import { ApolloError } from 'apollo-client/errors/ApolloError';
import { doQuery } from '../../repository';
import { search, mutation } from '../../repository/resource/taskQueries'

const taskResolver = {
  Query: {
    task(parent, args, context) {
      return findById(args, context)
    },
    tasks(parent, args, context) {
      return findAll(args, context)
    }
  },
  Mutation: {
    addTask: (parent, args, context) => {
      return addTask(args, context)
    },
    editTask: (parent, args, context) => {
      return editTask(args, context);
    },
    markTaskCompleted: (parent, args, context) => {
      return changeTaskStatus(args, context, true)
    },
    markTaskUncompleted: (parent, args, context) => {
      return changeTaskStatus(args, context, false)
    }
  },
};

async function findById(args, context) {
  const result = await doQuery(search.findById, [args.id])
  return result.rows[0] // check if its empty
}

async function findAll(args, context) {
  const result = await doQuery(search.findAll)
  return result.rows
}

async function addTask(args, context) {
  const result = await doQuery(mutation.addTask, [args.task.title, args.task.description])
  return result.rows[0]
}

async function editTask(args, context) {
  const result = await doQuery(mutation.editTask, [args.id, args.task.title, args.task.description])
  return result.rows[0]
}

async function changeTaskStatus(args, context, completed) {
  const result = await doQuery(mutation.changeTaskStatus, [args.id, completed])
  return result.rows[0]
}

export { taskResolver };