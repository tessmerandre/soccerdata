import { gql } from 'apollo-server-express';

const queryDefs = gql`
  scalar Date

  type Query {
    stadium(id: ID!): Stadium
    stadiums: [Stadium]
    footballClub(id: ID!): FootballClub
    footballClubs: [FootballClub]
  }

  type Mutation {
    addStadium(stadium: StadiumInput!): Stadium
    editStadium(id: ID!, stadium: StadiumInput!): Stadium
    deleteStadium(id: ID!): Boolean
    createFootballClub(footballClub: FootballClubInput!): FootballClub
    editFootballClub(id: ID!, footballClub: FootballClubInput!): FootballClub
    addFootballClubToSeason(footballClubId: ID!, seasonId: ID!): Boolean
    removeFootballClubFromSeason(footballClubId: ID!, seasonId: ID!): Boolean
  }
`;

export { queryDefs }