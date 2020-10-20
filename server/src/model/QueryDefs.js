import { gql } from 'apollo-server-express';

const queryDefs = gql`
  scalar Date

  type Query {
    task(id: ID!): Task
    tasks: [Task]
  }

  type Mutation {
    addTask(task: TaskInput!): Task
    editTask(id: ID!, task: TaskInput!): Task
    markTaskCompleted(id: ID!): Task
    markTaskUncompleted(id: ID!): Task
  }
`;

export { queryDefs }