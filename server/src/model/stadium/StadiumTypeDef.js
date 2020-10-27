import { gql } from 'apollo-server-express';

const stadiumTypeDefs = gql`
type Stadium {
  id: ID!
  name: String!
}

input StadiumInput {
  id: ID
  name: String!
}
`;

export { stadiumTypeDefs }