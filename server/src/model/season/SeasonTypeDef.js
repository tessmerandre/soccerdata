import { gql } from 'apollo-server-express';

const seasonTypeDefs = gql`
type Season {
  id: ID!
  name: String!
  footballClubs: [FootballClub]
}

type SeasonOverview {
  id: ID!
  name: String!
  footballClubs: [FootballClubSeason]!
}

type FootballClubSeason {
  id: ID!
  name: String!
  points: Int!
  wins: Int!
  losses: Int!
  draws: Int!
}

input SeasonInput {
  name: String!
  footballClubs: [FootballClubInput]!
}
`;

export { seasonTypeDefs }