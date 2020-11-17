import { gql } from 'apollo-server-express';

const matchTypeDefs = gql`
type Match {
  id: ID!
  team1: FootballClub!
  team2: FootballClub!
  season: Season!
  stadium: Stadium!
  created_at: String
}

input MatchInput {
  team1_id: ID!
  team1_score: Int!
  team2_id: ID!
  team2_score: Int!
  season_id: ID!
  stadium: ID!
}
`;

export { matchTypeDefs }