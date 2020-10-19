import { gql } from 'apollo-server-express';

const queryDefs = gql`
  scalar Date

  type Query {
    task(id: ID!): Task
    tasks: [Task]
  }

  type Mutation {
    addTask(task: TaskInput!): Task
  }
`;

export { queryDefs }