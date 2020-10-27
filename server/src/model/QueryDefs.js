import { gql } from 'apollo-server-express';

const queryDefs = gql`
  scalar Date

  type Query {
    stadium(id: ID!): Stadium
    stadiums: [Stadium]
  }

  type Mutation {
    addStadium(stadium: StadiumInput!): Stadium
    editStadium(id: ID!, stadium: StadiumInput!): Stadium
    deleteStadium(id: ID!): Boolean
  }
`;

export { queryDefs }