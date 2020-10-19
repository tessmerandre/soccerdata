import { gql } from 'apollo-server-express';

const taskTypeDefs = gql`
type Task {
  id: ID!
  title: String!
  description: String
}

input TaskInput {
  title: String!
  description: String
}
`;

export { taskTypeDefs }