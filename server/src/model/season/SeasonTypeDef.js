import { gql } from 'apollo-server-express';

const seasonTypeDefs = gql`
type Season {
  id: ID!
  name: String!
  footballClubs: [FootballClub]
}

input SeasonInput {
  name: String!
  footballClubs: [FootballClubInput]!
}
`;

export { seasonTypeDefs }