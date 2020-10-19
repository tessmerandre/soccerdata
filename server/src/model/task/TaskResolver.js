import { ApolloError } from 'apollo-client/errors/ApolloError';

const tasks = [
  {
    'title': 'task1',
    'description': 'desc',
    'id': '1111111'
  },
  {
    'title': 'task2',
    'description': 'desc',
    'id': '222222'
  },
  {
    'title': 'task3',
    'description': 'desc',
    'id': '33333'
  },
  {
    'title': 'task4',
    'description': 'desc',
    'id': '444444'
  },
  {
    'title': 'task5',
    'description': 'desc',
    'id': '555555'
  },
]

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
  // fetch from database
  return tasks.filter((element) => element.id == args.id)[0];
}

async function findAll(args, context) {
  // retrieving all tasks from database
  return tasks;
}

async function addTask(args, context) {
  // add to database
  const task = {
    'id': new Date().getMilliseconds(),
    'title': args.task.title,
    'description': args.task.description
  }
  tasks.push(task)
  return task
}

export { taskResolver };